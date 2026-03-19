require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const pool = require('../src/config/database');

async function fixConstraint() {
  const client = await pool.connect();
  try {
    // Find the check constraint name on the vehicles table
    const checkRes = await client.query(`
      SELECT conname
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE c.contype = 'c'
        AND c.conrelid = 'vehicles'::regclass
        AND pg_get_constraintdef(c.oid) LIKE '%car%';
    `);

    if (checkRes.rows.length > 0) {
      const constraintName = checkRes.rows[0].conname;
      console.log('Found constraint: ' + constraintName);
      
      await client.query('ALTER TABLE vehicles DROP CONSTRAINT "' + constraintName + '"');
      console.log('Dropped old constraint');
    } else {
      console.log('No matching check constraint found, creating new one if needed.');
    }

    await client.query(`
      ALTER TABLE vehicles ADD CONSTRAINT vehicles_vehicle_type_check 
      CHECK (vehicle_type IN ('car','van','suv','tuktuk','other'))
    `);
    console.log('Added new constraint allowing "tuktuk"');

  } catch (err) {
    console.error('Error altering constraint:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

fixConstraint();
