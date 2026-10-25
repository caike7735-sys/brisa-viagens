const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
export function imageUrl(destination, width = 700) {
  if (!/^[a-z][a-z0-9-]*$/.test(destination.id))
    throw new TypeError("ID de imagem inválido.");
  if (destination.id === "noronha")
    return width > 700
      ? "fernando-de-noronha-1280.webp"
      : "fernando-de-noronha-640.webp";
  if (destination.image !== `images/${destination.id}-700.webp`)
    throw new TypeError("Imagem não permitida.");
  const size = [400, 700, 1000, 1280].find((size) => size >= width) || 1280;
  return `images/${destination.id}-${size}.webp`;
}
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const $ = (s) => document.querySelector(s);
export const money = (n) => currency.format(n);
export const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function imageSources(destination) {
  return destination.id === "noronha"
    ? "fernando-de-noronha-640.webp 640w, fernando-de-noronha-1280.webp 1280w"
    : [400, 700, 1000, 1280]
        .map((width) => `${imageUrl(destination, width)} ${width}w`)
        .join(", ");
}
