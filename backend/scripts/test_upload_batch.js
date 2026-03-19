const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: 4, email: 'newdriver@e2e.com', role: 'driver' },
  'fleetguard_super_secret_key_minimum_32_chars_long'
);

async function testUpload() {
  const form = new FormData();
  
  const uploadDir = path.resolve(__dirname, '../uploads');
  const files = [
    'dummy_front.jpg', 'dummy_rear.jpg', 'dummy_left.jpg', 'dummy_right.jpg',
    'dummy_interior.jpg', 'dummy_dashboard.jpg', 'dummy_damage.jpg', 'dummy_odometer.jpg'
  ];

  files.forEach(f => {
    const filePath = path.join(uploadDir, f);
    if (fs.existsSync(filePath)) {
      form.append('photos', fs.createReadStream(filePath));
    } else {
      console.log(`Missing test file: ${filePath}`);
    }
  });

  const types = ['front','rear','left','right','interior','dashboard','damage','odometer'];
  form.append('photo_types', JSON.stringify(types));

  try {
    const res = await axios.post('http://localhost:3001/api/photos/upload-batch/3', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });
    console.log('SUCCESS:', res.status, res.data);
  } catch (err) {
    console.error('ERROR:', err.response ? err.response.status : err.message);
    if (err.response) console.error(err.response.data);
  }
}

testUpload();
