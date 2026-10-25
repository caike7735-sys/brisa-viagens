import { destinations } from "./data.js";
import { icon } from "./icons.js";
import { state } from "./state.js";
import {
  $,
  money,
  normalize,
  escapeHtml,
  imageUrl,
  imageSources,
} from "./utils.js";
let toastTimeout;
export function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(
    () => $("#toast").classList.remove("visible"),
    3200,
  );
}
export function render() {
  let list = destinations.filter(
    (d) =>
      (state.category === "all" || d.category === state.category) &&
      (!state.favoritesOnly || state.favorites.includes(d.id)) &&
      (!state.query ||
        normalize(`${d.name} ${d.region} ${d.tags.join(" ")}`).includes(
          normalize(state.query),
        )),
  );
  const order = $("#sort").value;
  if (order === "price") list.sort((a, b) => a.price - b.price);
  if (order === "rating") list.sort((a, b) => b.rating - a.rating);
  const total = list.length;
  const visible = state.showAll ? list : list.slice(0, 4);
  $("#destination-grid").innerHTML = visible
    .map(
      (d) =>
        `<article class="destination-card">
        <div class="card-photo">
        <img src="${imageUrl(d)}" alt="Paisagem de inspiração para ${escapeHtml(d.name)}" loading="lazy" decoding="async" width="700" height="467" srcset="${imageSources(d)}" sizes="(max-width:420px) 86vw, (max-width:800px) 43vw, 22vw" >
        <span class="card-badge">${escapeHtml(d.badge)}</span>
        <button class="card-favorite ${state.favorites.includes(d.id) ? "saved" : ""}" data-save="${d.id}" aria-label="${state.favorites.includes(d.id) ? "Remover" : "Salvar"} ${escapeHtml(d.name)}" aria-pressed="${state.favorites.includes(d.id)}">${icon("heart")}</button>
        </div>
        <div class="card-info">
        <div class="card-location">${icon("pin")}${escapeHtml(d.region)}</div>
        <div class="card-title-row">
        <h3>${escapeHtml(d.name)}</h3>
        <span class="rating" aria-label="Avaliação ilustrativa ${d.rating} de 5">
        <span class="star">★</span>${d.rating.toFixed(1).replace(".", ",")}</span>
        </div>
        <p class="card-description">${escapeHtml(d.description)}</p>
        <div class="card-bottom">
        <div>
        <span class="price-label">Estimativa a partir de</span>
        <span class="price">${money(d.price)} <small>/ pessoa</small>
        </span>
        </div>
        <button class="details-button" data-details="${d.id}" aria-label="Explorar ${escapeHtml(d.name)}">${icon("arrow-up-right")}</button>
        </div>
        </div>
        </article>`,
    )
    .join("");
  $("#favorite-count").textContent = state.favorites.length;
  $("#show-favorites").setAttribute(
    "aria-pressed",
    String(state.favoritesOnly),
  );
  $("#empty-state").hidden = total > 0;
  $("#load-more").hidden = state.showAll || total <= 4;
  $("#results-message").textContent = state.favoritesOnly
    ? `Suas viagens salvas · ${total} destino${total !== 1 ? "s" : ""}`
    : state.query
      ? `${total} destino${total !== 1 ? "s" : ""} para “${state.query}”`
      : "";
  document.querySelectorAll(".filter").forEach((b) => {
    b.classList.toggle("active", b.dataset.filter === state.category);
    b.setAttribute("aria-pressed", String(b.dataset.filter === state.category));
  });
}
export function reset() {
  state.category = "all";
  state.query = "";
  state.favoritesOnly = false;
  state.showAll = true;
  $("#destination-input").value = "";
  $("#sort").value = "popular";
  render();
}
export function details(id) {
  const d = destinations.find((x) => x.id === id);
  if (!d) return;
  const travelers = Number($("#travelers").value);
  const date = $("#travel-date").value;
  $("#dialog-content").innerHTML =
    `<img class="dialog-image" width="1100" height="733" srcset="${imageSources(d)}" sizes="(max-width:600px) 92vw, 540px" src="${imageUrl(d, 1100)}" alt="Paisagem de inspiração para ${escapeHtml(d.name)}">
        <div class="dialog-body">
        <div class="eyebrow">${escapeHtml(d.region)}</div>
        <h2 id="dialog-title">${escapeHtml(d.name)}</h2>
        <p>${escapeHtml(d.long)}</p>
        <div class="dialog-tags">${d.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}<span>${d.days} dias sugeridos</span>
        </div>
        <div class="dialog-estimate">
        <span class="price-label">Estimativa ilustrativa para ${travelers} viajante${travelers > 1 ? "s" : ""}${date ? " · " + new Intl.DateTimeFormat("pt-BR").format(new Date(date + "T12:00:00")) : ""}</span>
        <span class="price">${money(d.price * travelers)}</span>
        </div>
        <button class="primary" id="save-from-dialog">${icon("heart")}${state.favorites.includes(id) ? "Remover das minhas viagens" : "Salvar nas minhas viagens"}</button>
        <small class="dialog-disclaimer">Projeto demonstrativo. Valores e avaliações ilustrativos, sem cotação em tempo real. Não inclui reserva, compra ou confirmação de disponibilidade. Imagens de inspiração.</small>
        </div>`;
  $("#save-from-dialog").dataset.destination = id;
  $("#destination-dialog").showModal();
}
export function updateFavorites(id) {
  const button = document.querySelector(`[data-save="${id}"]`);
  if (button) {
    const saved = state.favorites.includes(id);
    button.classList.toggle("saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute(
      "aria-label",
      `${saved ? "Remover" : "Salvar"} ${destinations.find((d) => d.id === id).name}`,
    );
  }
  $("#favorite-count").textContent = state.favorites.length;
  if (state.favoritesOnly) {
    const buttons = [...document.querySelectorAll("[data-save]")];
    const index = buttons.indexOf(button);
    render();
    const remaining = [...document.querySelectorAll("[data-save]")];
    if (!$("#destination-dialog").open)
      (
        remaining[Math.min(index, remaining.length - 1)] || $("#show-favorites")
      ).focus();
  }
}
