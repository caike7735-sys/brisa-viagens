const fs = require('node:fs');
fs.mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'image.png']) {
  if (fs.existsSync(file)) fs.copyFileSync(file, `dist/${file}`);
}
console.log('Static site prepared in dist.');
