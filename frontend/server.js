import { createServer } from 'http';
import { readFileSync, existsSync, createReadStream } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const port     = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || 'teamforta.nl';
const distDir  = join(__dirname, 'dist');

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
  const filePath = join(distDir, urlPath);
  const ext      = extname(filePath);

  if (ext && existsSync(filePath)) {
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    createReadStream(filePath).pipe(res);
    return;
  }

  const index = join(distDir, 'index.html');
  if (existsSync(index)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(index).pipe(res);
  } else {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Application not built. Run npm run build first.');
  }
}).listen(port, () => {
  console.log('> FleetGuard AI Frontend ready on http://' + hostname + ':' + port);
});
