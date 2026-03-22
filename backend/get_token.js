const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 4, email: 'newdriver@e2e.com', role: 'driver' }, 'fleetguard_super_secret_key_minimum_32_chars_long');
console.log(token);
process.exit(0);
