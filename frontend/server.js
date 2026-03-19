// server.js — Phusion Passenger entry point for FleetGuard AI React SPA
// Serves the Vite build output (dist/) as a static SPA with React Router fallback.
// Uses only Node.js built-in modules — no npm install required on the server.

const { createServer } = require('http');
const fs   = require('fs');
const path = require('path');

const port     = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || 'fleetguard.com';
const distDir  = path.join(__dirname, 'dist');

const MIME = {
  '.html':  'text/html; charset=utf-8',
  '.js':    'application/javascript',
  '.mjs':   'application/javascript',
  '.css':   'text/css',
  '.json':  'application/json',
  '.png':   'image/png',
  '.jpg':   'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.svg':   'image/svg+xml',
  '.ico':   'image/x-icon',
  '.woff':  'font/woff',
  '.woff2': 'font/woff2',
  '.webp':  'image/webp',
  '.ttf':   'font/ttf',
  '.map':   'application/json',
};

createServer((req, res) => {
  const urlPath  = req.url.split('?')[0];
  const filePath = path.join(distDir, urlPath);
  const ext      = path.extname(filePath);

  // Serve static asset if it exists (JS, CSS, images, fonts …)
  if (ext && fs.existsSync(filePath)) {
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA fallback — all route paths get index.html so React Router handles them
  const index = path.join(distDir, 'index.html');
  if (fs.existsSync(index)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(index).pipe(res);
  } else {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Application not built. Run npm run build first.');
  }
}).listen(port, (err) => {
  if (err) throw err;
  console.log('> FleetGuard AI Frontend ready on http://' + hostname + ':' + port);
});
