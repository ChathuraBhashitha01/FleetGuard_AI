/**
 * @module     Client Backend
 * @author     Chathura Bhashitha <chathurabhashitha01@gmail.com>
 * @description This file is part of the Client Backend of FleetGuard AI.
 *              All logic in this file satisfies the Client Portal dependencies.
 * @date       2026-03-07
 */

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  const queryToken = req.query.token;

  if (!header && !queryToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    let token;
    if (header && header.startsWith('Bearer ')) {
      token = header.split(' ')[1];
    } else if (queryToken) {
      token = queryToken;
    } else {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
