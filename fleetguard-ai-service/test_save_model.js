const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');

async function test() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    // Try save with nothing
    try {
        const res = await model.save({
            save: async (modelArtifacts) => {
                const saveDir = path.join(__dirname, 'test_model');
                if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);
                
                // Write model.json
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
                fs.writeFileSync(path.join(saveDir, 'model.json'), JSON.stringify(modelJSON, null, 2));
                
                // Write weights.bin
                if (modelArtifacts.weightData) {
                    const buf = Buffer.from(modelArtifacts.weightData);
                    fs.writeFileSync(path.join(saveDir, 'weights.bin'), buf);
                }
                
                return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
            }
        });
        console.log('Save SUCCESS:', fs.existsSync(path.join(__dirname, 'test_model', 'model.json')));
    } catch (err) {
        console.error('Save FAILED:', err.message);
    }
}

test();
