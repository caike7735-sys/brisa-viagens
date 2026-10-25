import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const port = Number(process.env.PORT) || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));
const publicFiles = new Set([
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "icons.js",
  "state.js",
  "utils.js",
  "render.js",
  "events.js",
  "catalog.js",
  "favicon.svg",
  "apple-touch-icon.png",
  "fernando-de-noronha.jpg",
  "fernando-de-noronha-640.webp",
  "fernando-de-noronha-1280.webp",
  "fonts/dm-sans.woff2",
  "fonts/manrope.woff2",
  "fonts/OFL-dm-sans.txt",
  "fonts/OFL-manrope.txt",
]);
for (const id of [
  "bali",
  "santorini",
  "patagonia",
  "arraial",
  "kyoto",
  "chapada",
  "alpes",
]) {
  for (const width of [400, 700, 1000, 1280])
    publicFiles.add(`images/${id}-${width}.webp`);
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
http
  .createServer((req, res) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end();
      return;
    }
    const name =
      new URL(req.url, "http://localhost").pathname.slice(1) || "index.html";
    if (!publicFiles.has(name)) {
      res.writeHead(404);
      res.end("Não encontrado");
      return;
    }
    fs.readFile(path.join(root, name), (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(name)] });
      res.end(req.method === "HEAD" ? undefined : data);
    });
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Brisa: http://localhost:${port}`),
  );
