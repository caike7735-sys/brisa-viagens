const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map();
function element(selector) {
  if (!elements.has(selector)) elements.set(selector, { value: selector === '#sort' ? 'popular' : selector === '#travelers' ? '2' : '', innerHTML: '', textContent: '', hidden: false, dataset: {}, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, addEventListener() {}, scrollIntoView() {}, showModal() {}, close() {} });
  return elements.get(selector);
}
const storage = new Map();
const context = vm.createContext({ document: { querySelector: element, querySelectorAll: () => [] }, localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v) }, setTimeout: () => 1, clearTimeout() {}, console, Intl, Date });
vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
const run = code => vm.runInContext(code, context);
assert.equal((element('#destination-grid').innerHTML.match(/class="destination-card"/g) || []).length, 4);
run("query='grecia'; showAll=true; render()");
assert.match(element('#destination-grid').innerHTML, /Santorini/);
assert.equal((element('#destination-grid').innerHTML.match(/class="destination-card"/g) || []).length, 1);
run("reset(); category='praia'; render()");
assert.equal((element('#destination-grid').innerHTML.match(/class="destination-card"/g) || []).length, 2);
run("toggleFavorite('bali'); favoritesOnly=true; category='all'; render()");
assert.match(element('#destination-grid').innerHTML, /Bali/);
assert.equal(element('#favorite-count').textContent, 1);
assert.equal(storage.get('brisa-favorites'), '["bali"]');
run("reset(); query='inexistente'; render()");
assert.equal(element('#empty-state').hidden, false);
run("reset(); details('bali')");
assert.match(element('#dialog-content').innerHTML, /9\.180/);
element('#sort').value = 'price'; run('reset()');
assert.ok(element('#destination-grid').innerHTML.indexOf('Arraial do Cabo') < element('#destination-grid').innerHTML.indexOf('Bali'));
console.log('OK: initial rendering, accent-insensitive search, categories, persisted favorites, empty state, traveler estimate and price sorting.');
