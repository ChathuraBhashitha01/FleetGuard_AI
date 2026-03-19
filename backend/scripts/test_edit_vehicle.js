require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign({ id: 1, email: 'manager@fleet.com', role: 'manager' }, process.env.JWT_SECRET);

async function testEdit() {
  const form = new FormData();
  form.append('make', 'Toyota_Test_Edit');
  form.append('model', 'Prius');
  form.append('year', '2022');
  form.append('color', 'Black');
  form.append('vehicle_type', 'car');
  
  // Create a dummy image file for testing
  const imgPath = path.join(__dirname, 'test_edit_img.jpg');
  fs.writeFileSync(imgPath, 'fake image data');
  form.append('photo', fs.createReadStream(imgPath));

  try {
    const res = await axios.put('http://localhost:3001/api/vehicles/1', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer \${token}`
      }
    });
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Failure:', err.response ? err.response.data : err.message);
  } finally {
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
}

testEdit();
