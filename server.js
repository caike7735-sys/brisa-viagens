const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT) || 3000;
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'fernando-de-noronha.jpg']);
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const filename = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!publicFiles.has(filename)) { res.writeHead(404); res.end('Nao encontrado'); return; }
  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) { res.writeHead(500); res.end('Erro ao carregar arquivo'); return; }
    res.writeHead(200, { 'Content-Type': ({ '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.jpg': 'image/jpeg' })[path.extname(filename)] + '; charset=utf-8' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Brisa disponivel em http://localhost:${port}`));
