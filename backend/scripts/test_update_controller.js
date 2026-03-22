require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const ctrl = require('../src/controllers/vehicles.controller');

const req = {
  params: { id: '1' },
  body: { make: 'Toyota_Test_Edit_2', model: 'Prius', year: '2022' },
  file: { filename: 'test_edit_file.jpg' }
};

const res = {
  json: (data) => console.log('Response:', data),
  status: (code) => { console.log('Status code:', code); return res; }
};

const next = (err) => console.error('Error in controller:', err);

async function runTest() {
  await ctrl.update(req, res, next);
}

runTest();
