const names = new Set([
  "heart",
  "pin",
  "calendar",
  "users",
  "search",
  "globe",
  "sun",
  "mountain",
  "building",
  "compass",
  "sparkles",
  "sort",
  "menu",
  "arrow-right",
  "arrow-up-right",
  "arrow-down",
]);
export function icon(name) {
  const safe = names.has(name) ? name : "compass";
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#icon-' +
    safe +
    '"></use></svg>'
  );
}
