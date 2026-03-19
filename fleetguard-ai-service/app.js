/**
 * @module     AI Service
 * @author     Bethmi Jayamila <bethmij@gmail.com>
 * @description This file is part of the AI Damage Detection service of FleetGuard AI.
 *              Developed and trained by Bethmi Jayamila.
 * @date       2026-02-16
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const tf = require('@tensorflow/tfjs');
const path = require('path');
const fs = require('fs');
const jpeg = require('jpeg-js');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const DATASET_PATH = path.join(__dirname, 'dataset', 'data1a', 'train');
const IMG_SIZE = 128;
let model = null;
let STUB_MODE = false;

function decodeImage(filePath) {
    const rawData = fs.readFileSync(filePath);
    const jpegData = jpeg.decode(rawData, {useTArray: true});
    const numChannels = 3;
    const numPixels = jpegData.width * jpegData.height;
    const values = new Int32Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] = jpegData.data[i * 4 + channel];
        }
    }

    const outShape = [jpegData.height, jpegData.width, numChannels];
    const imageTensor = tf.tensor3d(values, outShape, 'int32');
    const resized = tf.image.resizeBilinear(imageTensor, [IMG_SIZE, IMG_SIZE]);
    const normalized = resized.toFloat().sub(127.5).div(127.5).expandDims(0); // For predict or stack
    tf.dispose([imageTensor, resized]);
    return normalized;
}

const MODEL_DIR = path.join(__dirname, 'model_weights');

const saveHandler = {
    save: async (modelArtifacts) => {
        if (!fs.existsSync(MODEL_DIR)) fs.mkdirSync(MODEL_DIR);
        const modelJSON = {
            modelTopology: modelArtifacts.modelTopology,
            format: modelArtifacts.format,
            generatedBy: modelArtifacts.generatedBy,
            convertedBy: modelArtifacts.convertedBy,
            weightsManifest: [{
                paths: ['./weights.bin'],
                weights: modelArtifacts.weightSpecs
            }]
        };
        fs.writeFileSync(path.join(MODEL_DIR, 'model.json'), JSON.stringify(modelJSON, null, 2));
        if (modelArtifacts.weightData) {
            fs.writeFileSync(path.join(MODEL_DIR, 'weights.bin'), Buffer.from(modelArtifacts.weightData));
        }
        return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
    }
};

const loadHandler = {
    load: async () => {
        const jsonPath = path.join(MODEL_DIR, 'model.json');
        const modelJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const weightManifest = modelJSON.weightsManifest[0];
        
        const buf = Buffer.concat(weightManifest.paths.map(f => fs.readFileSync(path.join(MODEL_DIR, f))));
        return {
            modelTopology: modelJSON.modelTopology,
            weightSpecs: weightManifest.weights,
            weightData: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
        };
    }
};

async function loadDataAndTrain() {
    console.log("Loading dataset to train model in memory...");
    const classes = ['01-whole', '00-damage']; 
    const images = [];
    const labels = [];

    for (let c = 0; c < classes.length; c++) {
        const classDir = path.join(DATASET_PATH, classes[c]);
        if (!fs.existsSync(classDir)) continue;

        const files = fs.readdirSync(classDir).filter(f => f.match(/\.(jpg|jpeg)$/i));
        const sampleSize = Math.min(files.length, 10); 
        
        for (let i = 0; i < sampleSize; i++) {
            try {
                const normalized = decodeImage(path.join(classDir, files[i]));
                images.push(normalized.squeeze()); 
                labels.push(c);
            } catch (err) {}
        }
    }

    if (images.length === 0) {
        console.warn("WARNING: No training images valid. Running STUB mode.");
        STUB_MODE = true;
        return;
    }

    const xTrain = tf.stack(images);
    const yTrain = tf.tensor1d(labels, 'int32');
    const yTrainOneHot = tf.oneHot(yTrain, classes.length);

    const newModel = tf.sequential();
    newModel.add(tf.layers.flatten({ inputShape: [IMG_SIZE, IMG_SIZE, 3] }));
    newModel.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    newModel.add(tf.layers.dense({ units: 2, activation: 'softmax' })); 
    newModel.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

    console.log("Training model in memory...");
    await newModel.fit(xTrain, yTrainOneHot, { epochs: 1, batchSize: 16, shuffle: true });
    model = newModel;

    try {
        await model.save(saveHandler);
        console.log("Model weights saved to model_weights/ on disk!");
    } catch (err) {
        console.error("Failed to save model:", err.message);
    }
    
    tf.dispose([xTrain, yTrain, yTrainOneHot]);
    images.forEach(t => t.dispose());
}

(async () => {
    const jsonPath = path.join(MODEL_DIR, 'model.json');
    if (fs.existsSync(jsonPath)) {
        console.log("Loading pre-trained model weights from disk...");
        try {
            model = await tf.loadLayersModel(loadHandler);
            console.log("Model loaded successfully from disk. (Stub: OFF)");
        } catch (err) {
            console.error("Failed to load model from disk:", err.message);
            await loadDataAndTrain();
        }
    } else {
        await loadDataAndTrain();
    }
})();

app.get('/api/health', (req, res) => {
    res.json({ status: "healthy", service: "FleetGuard AI Service (TFJS Pure In-Memory)" });
});

app.post('/api/detect', upload.array('images', 8), async (req, res) => {
    if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, error: 'No image uploaded' });

    const inspection_id = req.body.inspection_id || 'unknown';
    const filepath = req.files[0].path;

    try {
        let isDamaged = true;
        let confidence = 0.95;

        if (model && !STUB_MODE) {
            const t = decodeImage(filepath); // returns with batch dim
            const prediction = model.predict(t);
            const probArr = await prediction.data();
            t.dispose();
            prediction.dispose();

            const probDamage = probArr[1];
            isDamaged = probDamage > 0.5;
            confidence = isDamaged ? probDamage : probArr[0];
        } else {
            STUB_MODE = true;
        }

        const detections = [];
        let health_score = 100;
        let overall_severity = "low";

        if (isDamaged) {
            health_score = 80;
            overall_severity = confidence > 0.8 ? "high" : "medium";
            
            detections.push({
                damage_type: "dent/scratch",
                severity: overall_severity,
                confidence: confidence,
                bbox_json: [0, 0, 800, 600]
            });
        }

        res.json({
            success: true,
            inspection_id,
            overall_severity: isDamaged ? overall_severity : "low",
            health_score,
            detections,
            model_info: { stub_mode: STUB_MODE, type: "tfjs-in-memory" }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } finally {
        if (req.files) {
            req.files.forEach(f => {
                if (fs.existsSync(f.path)) fs.unlinkSync(f.path);
            });
        }
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`FleetGuard AI Service starting on port ${PORT}...`);
});
