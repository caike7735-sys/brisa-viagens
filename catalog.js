const categories = new Set(["praia", "natureza", "cidade", "aventura"]);
export function validateDestinations(items) {
  if (!Array.isArray(items))
    throw new TypeError("O catálogo deve ser uma lista.");
  const seen = new Set();
  for (const item of items) {
    const valid =
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      /^[a-z][a-z0-9-]*$/.test(item.id) &&
      !seen.has(item.id) &&
      categories.has(item.category) &&
      ["name", "region", "badge", "description", "long"].every(
        (key) => typeof item[key] === "string" && item[key].trim(),
      ) &&
      Array.isArray(item.tags) &&
      item.tags.every((tag) => typeof tag === "string") &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isFinite(item.rating) &&
      item.rating >= 0 &&
      item.rating <= 5 &&
      Number.isInteger(item.days) &&
      item.days > 0;
    if (!valid) throw new TypeError("Destino inválido no catálogo.");
    const expected =
      item.id === "noronha"
        ? "fernando-de-noronha.jpg"
        : `images/${item.id}-700.webp`;
    if (item.image !== expected)
      throw new TypeError("Imagem fora da lista permitida.");
    seen.add(item.id);
  }
  return items;
}
