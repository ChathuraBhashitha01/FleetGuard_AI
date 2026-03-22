const { Pool } = require('pg');

const pool = new Pool({
  user: 'bethmij',
  host: 'localhost',
  database: 'fleetguard_db',
  password: 'postgres',
  port: 5432,
});

async function run() {
  try {
    const { rows } = await pool.query("SELECT id, email, role FROM users WHERE role = 'driver' LIMIT 1");
    if (rows.length === 0) {
      console.log('No driver found');
    } else {
      console.log(JSON.stringify(rows[0]));
    }
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}
run();
