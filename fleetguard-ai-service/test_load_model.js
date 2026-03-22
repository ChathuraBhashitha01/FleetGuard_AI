const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');

async function test() {
    const loadHandler = {
        load: async () => {
            const saveDir = path.join(__dirname, 'test_model');
            const jsonPath = path.join(saveDir, 'model.json');
            if (!fs.existsSync(jsonPath)) throw new Error('model.json missing');
            
            const modelJSON = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            const weightManifest = modelJSON.weightsManifest[0];
            const weightSpecs = weightManifest.weights;
            
            const weightData = [];
            for (const f of weightManifest.paths) {
                const p = path.join(saveDir, f);
                weightData.push(fs.readFileSync(p));
            }
            const buf = Buffer.concat(weightData);
            
            return {
                modelTopology: modelJSON.modelTopology,
                weightSpecs,
                weightData: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
            };
        }
    };

    try {
        const model = await tf.loadLayersModel(loadHandler);
        console.log('Load SUCCESS:', !!model);
        model.predict(tf.tensor2d([[1]])); // Run sample prediction
    } catch (err) {
        console.error('Load FAILED:', err.message);
    }
}

test();
