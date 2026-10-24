const fs = require("node:fs");
const { build } = require("esbuild");
(async () => {
  const out = "dist";
  fs.mkdirSync(out, { recursive: true });
  const result = await build({
    entryPoints: { app: "app.js", styles: "styles.css" },
    bundle: true,
    external: ["*.woff2"],
    minify: true,
    outdir: out,
    entryNames: "[name]-[hash]",
    metafile: true,
  });
  let html = fs.readFileSync("index.html", "utf8");
  for (const [name, info] of Object.entries(result.metafile.outputs)) {
    const file = name.slice(5);
    if (info.entryPoint === "app.js")
      html = html.replace('src="app.js"', `src="${file}"`);
    if (info.entryPoint === "styles.css")
      html = html.replace('href="styles.css"', `href="${file}"`);
  }
  fs.writeFileSync(`${out}/index.html`, html);
  for (const name of [
    "favicon.svg",
    "apple-touch-icon.png",
    "fernando-de-noronha.jpg",
    "fernando-de-noronha-640.webp",
    "fernando-de-noronha-1280.webp",
    "fonts",
  ])
    fs.cpSync(name, `${out}/${name}`, { recursive: true });
  fs.writeFileSync(`${out}/.nojekyll`, "");
  console.log("Site preparado em dist/");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
