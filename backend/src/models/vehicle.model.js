/**
 * @module     Admin Backend
 * @author     Kalindu Tharanga <kalindu.th@gmail.com>
 * @description This file is part of the Admin Backend of FleetGuard AI.
 *              All dashboard and manager views satisfy the Admin Portal.
 * @date       2026-03-11
 */

const { db } = require('./index');

async function findAll({ status, search, page = 1, limit = 20 }) {
  let q = 'SELECT * FROM vehicles WHERE 1=1';
  const p = [];

  if (status) {
    p.push(status);
    q += ` AND status=$${p.length}`;
  }
  if (search) {
    p.push(`%${search}%`);
    q += ` AND (number_plate ILIKE $${p.length} OR make ILIKE $${p.length})`;
  }

  p.push(limit, (page - 1) * limit);
  q += ` ORDER BY number_plate LIMIT $${p.length - 1} OFFSET $${p.length}`;

  const result = await db.query(q, p);
  return result.rows;
}

async function findAvailable() {
  const r = await db.query(
    `SELECT id, number_plate, make, model, year, color, health_score, photo_url, vehicle_type
     FROM vehicles WHERE status='available' ORDER BY health_score DESC`,
  );
  return r.rows;
}

async function findById(id) {
  const r = await db.query('SELECT * FROM vehicles WHERE id=$1', [id]);
  return r.rows[0] || null;
}

async function create({ number_plate, make, model, year, color, vehicle_type, photo_url }) {
  const r = await db.query(
    `INSERT INTO vehicles (number_plate, make, model, year, color, vehicle_type, photo_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [number_plate.toUpperCase(), make, model, year, color, vehicle_type || 'car', photo_url],
  );
  return r.rows[0];
}

async function update(id, { make, model, year, color, notes, vehicle_type, photo_url }) {
  let q = 'UPDATE vehicles SET updated_at=NOW()';
  const p = [];
  let idx = 1;

  if (make !== undefined) { q += `, make=$${idx++}`; p.push(make); }
  if (model !== undefined) { q += `, model=$${idx++}`; p.push(model); }
  if (year !== undefined) { q += `, year=$${idx++}`; p.push(year); }
  if (color !== undefined) { q += `, color=$${idx++}`; p.push(color); }
  if (notes !== undefined) { q += `, notes=$${idx++}`; p.push(notes); }
  if (vehicle_type !== undefined) { q += `, vehicle_type=$${idx++}`; p.push(vehicle_type); }
  if (photo_url !== undefined) { q += `, photo_url=$${idx++}`; p.push(photo_url); }

  p.push(id);
  q += ` WHERE id=$${idx} RETURNING *`;

  const r = await db.query(q, p);
  return r.rows[0] || null;
}

async function updateStatus(id, status, userId) {
  const r = await db.query(
    `UPDATE vehicles SET status=$1, updated_at=NOW()
     WHERE id=$2 RETURNING id, number_plate, status`,
    [status, id],
  );
  return r.rows[0] || null;
}

async function remove(id) {
  const r = await db.query('DELETE FROM vehicles WHERE id=$1 RETURNING id', [id]);
  return r.rows[0] || null;
}

module.exports = {
  findAll,
  findAvailable,
  findById,
  create,
  update,
  updateStatus,
  remove,
};

