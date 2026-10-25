import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { validateDestinations } from "../../catalog.js";
import { destinations } from "../../data.js";
import { escapeHtml, imageUrl, imageSources, money } from "../../utils.js";

test("catalog rejects executable IDs, untrusted image URLs, duplicates and invalid numeric data", () => {
  const source = destinations[1];
  for (const changes of [
    { id: 'bali" onclick=alert(1)' },
    { image: "https://example.com/track.jpg" },
    { image: "javascript:alert(1)" },
    { price: NaN },
    { rating: 6 },
    { days: 0 },
    { tags: [{}] },
  ])
    assert.throws(
      () => validateDestinations([{ ...source, ...changes }]),
      TypeError,
    );
  assert.throws(() => validateDestinations([source, source]), TypeError);
  assert.equal(validateDestinations(destinations).length, 8);
});
test("untrusted text is escaped without changing legitimate content", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)"> & \''),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;",
  );
  assert.equal(escapeHtml("Chapada dos Veadeiros"), "Chapada dos Veadeiros");
  assert.match(money(9180), /9\.180/);
});
test("every destination has real responsive files and its own source and attribution", () => {
  const records = JSON.parse(fs.readFileSync("images/sources.json", "utf8"));
  const images = new Set();
  for (const destination of destinations) {
    images.add(imageUrl(destination));
    for (const candidate of imageSources(destination).split(", "))
      assert.ok(fs.existsSync(candidate.split(" ")[0]));
    const source = records.find((record) => record.id === destination.id);
    assert.ok(source?.author);
    assert.ok(source?.description);
    assert.ok(source?.license);
    assert.match(
      source.source,
      /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
    );
    assert.match(source.licenseUrl, /^https:/);
  }
  assert.equal(images.size, 8);
  assert.throws(
    () => imageUrl({ id: "../secret", image: "javascript:alert(1)" }),
    TypeError,
  );
});
