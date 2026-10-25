import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "@playwright/test";

test("production bundle loads below a project path with no missing local assets or runtime errors", async () => {
  const root = path.resolve("dist");
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".woff2": "font/woff2",
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".png": "image/png",
  };
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, "http://localhost");
    if (!url.pathname.startsWith("/brisa-viagens/")) {
      response.writeHead(404);
      response.end();
      return;
    }
    const file = path.resolve(
      root,
      url.pathname.slice("/brisa-viagens/".length) || "index.html",
    );
    if (!file.startsWith(root + path.sep)) {
      response.writeHead(404);
      response.end();
      return;
    }
    try {
      const bytes = fs.readFileSync(file);
      response.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "text/plain",
      });
      response.end(bytes);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    const missing = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (
        response.url().startsWith("http://127.0.0.1") &&
        response.status() >= 400
      )
        missing.push(response.url());
    });
    await page.goto(`http://127.0.0.1:${server.address().port}/brisa-viagens/`);
    await page.waitForFunction(
      () => document.querySelectorAll(".destination-card").length === 4,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#all-destinations").click();
    for (const image of await page.locator(".destination-card img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(
        (element) =>
          element.complete ||
          new Promise((resolve) =>
            element.addEventListener("load", resolve, { once: true }),
          ),
      );
      assert.equal(
        await image.evaluate((element) => element.naturalWidth > 0),
        true,
      );
    }
    await page.locator('[data-details="bali"]').click();
    assert.equal(
      await page.getByRole("dialog", { name: "Bali", exact: true }).isVisible(),
      true,
    );
    await page.keyboard.press("Escape");
    await page.locator(".photo-credit summary").click();
    assert.equal(await page.locator(".photo-credit li").count(), 8);
    assert.equal(
      await page
        .locator(".hero-link svg")
        .evaluate((element) => element.getBBox().width > 0),
      true,
    );
    assert.equal(
      await page.evaluate(() => document.fonts.check('16px "DM Sans"')),
      true,
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(missing, []);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  assert.equal(fs.existsSync(path.join(root, "server.js")), false);
  assert.equal(fs.existsSync(path.join(root, "package.json")), false);
  assert.equal(
    fs.readdirSync(root).filter((name) => /^app-.*\.js$/.test(name)).length,
    1,
  );
  assert.equal(
    fs.readdirSync(root).filter((name) => /^styles-.*\.css$/.test(name)).length,
    1,
  );
});
