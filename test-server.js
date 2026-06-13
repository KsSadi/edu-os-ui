const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8780;

const types = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  let f = path.join(process.cwd(), decodeURIComponent(p));
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('NF: ' + e.message); return; }
    const t = types[path.extname(f).toLowerCase()] || 'text/plain';
    res.writeHead(200, { 'Content-Type': t });
    res.end(d);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('LISTEN ' + PORT);
});
