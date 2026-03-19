require('dotenv').config();
const { generatePdf } = require('./src/controllers/inspections.controller');

// Mock req and res
const req = {
  params: { id: 3 },
  user: { id: 6, email: 'driver@e2e.com', role: 'driver' } // driver_id was 6
};

const res = {
  json: (data) => console.log('Response Success:', data),
  status: (code) => {
    console.log('Response Status:', code);
    return res;
  }
};

const next = (err) => {
  console.error('Error triggered in next():', err);
};

console.log('Testing generatePdf for ID 3...');
generatePdf(req, res, next);
