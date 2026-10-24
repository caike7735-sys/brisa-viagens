import { destinations } from "./data.js";
import { icon } from "./icons.js";
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const $ = (s) => document.querySelector(s);
const money = (n) => currency.format(n);
const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
let favorites = [];
try {
  favorites = JSON.parse(localStorage.getItem("brisa-favorites") || "[]");
  if (!Array.isArray(favorites)) favorites = [];
  favorites = [
    ...new Set(favorites.filter((id) => destinations.some((d) => d.id === id))),
  ];
} catch {
  /* O armazenamento pode estar bloqueado; manter a navegação disponível. */
}
const state = {
  category: "all",
  query: "",
  favoritesOnly: false,
  showAll: false,
};
let toastTimeout;
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const imageUrl = (d, width = 700) =>
  d.image.endsWith(".jpg")
    ? d.image
    : `https://images.unsplash.com/${d.image}?auto=format&fit=crop&w=${width}&q=70`;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(
    () => $("#toast").classList.remove("visible"),
    3200,
  );
}
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((x) => x !== id);
    toast("Destino removido das suas viagens.");
  } else {
    favorites.push(id);
    toast("Destino salvo! Encontre em Minhas viagens.");
  }
  try {
    localStorage.setItem("brisa-favorites", JSON.stringify(favorites));
  } catch {
    toast(
      "Salvo nesta sessão. O armazenamento do navegador está indisponível.",
    );
  }
  updateFavorites(id);
}
function render() {
  let list = destinations.filter(
    (d) =>
      (state.category === "all" || d.category === state.category) &&
      (!state.favoritesOnly || favorites.includes(d.id)) &&
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
        `<article class="destination-card"><div class="card-photo"><img src="${imageUrl(d)}" alt="Paisagem de inspiração para ${escapeHtml(d.name)}" loading="lazy" decoding="async" width="700" height="467" srcset="${imageSources(d)}" sizes="(max-width:420px) 86vw, (max-width:800px) 43vw, 22vw" ><span class="card-badge">${escapeHtml(d.badge)}</span><button class="card-favorite ${favorites.includes(d.id) ? "saved" : ""}" data-save="${d.id}" aria-label="${favorites.includes(d.id) ? "Remover" : "Salvar"} ${escapeHtml(d.name)}" aria-pressed="${favorites.includes(d.id)}">${icon("heart")}</button></div><div class="card-info"><div class="card-location">${icon("pin")}${escapeHtml(d.region)}</div><div class="card-title-row"><h3>${escapeHtml(d.name)}</h3><span class="rating" aria-label="Avaliação ilustrativa ${d.rating} de 5"><span class="star">★</span>${d.rating.toFixed(1).replace(".", ",")}</span></div><p class="card-description">${escapeHtml(d.description)}</p><div class="card-bottom"><div><span class="price-label">Estimativa a partir de</span><span class="price">${money(d.price)} <small>/ pessoa</small></span></div><button class="details-button" data-details="${d.id}" aria-label="Explorar ${escapeHtml(d.name)}">${icon("arrow-up-right")}</button></div></div></article>`,
    )
    .join("");
  $("#favorite-count").textContent = favorites.length;
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
function reset() {
  state.category = "all";
  state.query = "";
  state.favoritesOnly = false;
  state.showAll = true;
  $("#destination-input").value = "";
  $("#sort").value = "popular";
  render();
}
function details(id) {
  const d = destinations.find((x) => x.id === id);
  if (!d) return;
  const travelers = Number($("#travelers").value);
  const date = $("#travel-date").value;
  $("#dialog-content").innerHTML =
    `<img class="dialog-image" width="1100" height="733" srcset="${imageSources(d)}" sizes="(max-width:600px) 92vw, 540px" src="${imageUrl(d, 1100)}" alt="Paisagem de inspiração para ${escapeHtml(d.name)}"><div class="dialog-body"><div class="eyebrow">${escapeHtml(d.region)}</div><h2 id="dialog-title">${escapeHtml(d.name)}</h2><p>${escapeHtml(d.long)}</p><div class="dialog-tags">${d.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}<span>${d.days} dias sugeridos</span></div><div class="dialog-estimate"><span class="price-label">Estimativa ilustrativa para ${travelers} viajante${travelers > 1 ? "s" : ""}${date ? " · " + new Intl.DateTimeFormat("pt-BR").format(new Date(date + "T12:00:00")) : ""}</span><span class="price">${money(d.price * travelers)}</span></div><button class="primary" id="save-from-dialog">${icon("heart")}${favorites.includes(id) ? "Remover das minhas viagens" : "Salvar nas minhas viagens"}</button><small class="dialog-disclaimer">Projeto demonstrativo. Valores e avaliações ilustrativos, sem cotação em tempo real. Não inclui reserva, compra ou confirmação de disponibilidade. Imagens de inspiração.</small></div>`;
  $("#save-from-dialog").addEventListener("click", () => {
    toggleFavorite(id);
    $("#save-from-dialog").innerHTML =
      icon("heart") +
      (favorites.includes(id)
        ? "Remover das minhas viagens"
        : "Salvar nas minhas viagens");
  });
  $("#destination-dialog").showModal();
}
$("#destination-grid").addEventListener("click", (e) => {
  const save = e.target.closest("[data-save]");
  const detail = e.target.closest("[data-details]");
  if (save) toggleFavorite(save.dataset.save);
  if (detail) details(detail.dataset.details);
});
document.querySelectorAll("[data-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    state.category = b.dataset.filter;
    state.favoritesOnly = false;
    state.showAll = true;
    render();
  }),
);
$("#sort").addEventListener("change", render);
$("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.query = $("#destination-input").value.trim();
  state.favoritesOnly = false;
  state.showAll = true;
  render();
  $("#destinos").scrollIntoView({ behavior: "smooth" });
});
$("#show-favorites").addEventListener("click", () => {
  state.favoritesOnly = !state.favoritesOnly;
  state.category = "all";
  state.query = "";
  $("#destination-input").value = "";
  state.showAll = true;
  render();
  $("#destinos").scrollIntoView({ behavior: "smooth" });
});
$("#all-destinations").addEventListener("click", reset);
$("#clear-search").addEventListener("click", reset);
$("#load-more").addEventListener("click", () => {
  state.showAll = true;
  render();
});
document.querySelectorAll("[data-experience]").forEach((b) =>
  b.addEventListener("click", () => {
    reset();
    state.category = b.dataset.experience;
    render();
    $("#destinos").scrollIntoView({ behavior: "smooth" });
  }),
);
$("#close-dialog").addEventListener("click", () =>
  $("#destination-dialog").close(),
);
$("#destination-dialog").addEventListener("click", (e) => {
  if (e.target === $("#destination-dialog")) {
    const r = e.target.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      e.target.close();
  }
});
$("#menu-button").addEventListener("click", () => {
  const open = $(".header nav").classList.toggle("open");
  $("#menu-button").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".header nav a").forEach((a) =>
  a.addEventListener("click", () => {
    $(".header nav").classList.remove("open");
    $("#menu-button").setAttribute("aria-expanded", "false");
  }),
);
$("#newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#newsletter-message").textContent =
    "Demonstração: nenhum e-mail foi enviado ou armazenado.";
  $("#newsletter-form").reset();
});
const today = new Date();
$("#travel-date").min =
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
$("#year").textContent = today.getFullYear();
render();

function updateFavorites(id) {
  const button = document.querySelector(`[data-save="${id}"]`);
  if (button) {
    const saved = favorites.includes(id);
    button.classList.toggle("saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute(
      "aria-label",
      `${saved ? "Remover" : "Salvar"} ${destinations.find((d) => d.id === id).name}`,
    );
  }
  $("#favorite-count").textContent = favorites.length;
  if (state.favoritesOnly) {
    const buttons = [...document.querySelectorAll("[data-save]")];
    const index = buttons.indexOf(button);
    render();
    const remaining = [...document.querySelectorAll("[data-save]")];
    (
      remaining[Math.min(index, remaining.length - 1)] || $("#show-favorites")
    ).focus();
  }
}
let searchTimeout;
$("#destination-input").addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    state.query = $("#destination-input").value.trim();
    state.favoritesOnly = false;
    state.showAll = true;
    render();
  }, 200);
});
function closeMenu(restoreFocus = false) {
  $(".header nav").classList.remove("open");
  $("#menu-button").setAttribute("aria-expanded", "false");
  if (restoreFocus) $("#menu-button").focus();
}
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    $("#menu-button").getAttribute("aria-expanded") === "true"
  )
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting)
          document.querySelectorAll(".header nav a").forEach((link) => {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      }
    },
    { rootMargin: "-10% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}
try {
  localStorage.removeItem("brisa-newsletter-email");
} catch {
  /* O armazenamento pode estar bloqueado; manter a navegação disponível. */
}
document.addEventListener(
  "error",
  (event) => {
    const img = event.target;
    if (img.tagName === "IMG" && !img.src.includes("fernando-de-noronha")) {
      img.removeAttribute("srcset");
      img.src = "fernando-de-noronha-640.webp";
      img.alt = "Paisagem de inspiração: Fernando de Noronha";
    }
  },
  true,
);

function imageSources(d) {
  return d.image.endsWith(".jpg")
    ? "fernando-de-noronha-640.webp 640w, fernando-de-noronha-1280.webp 1280w"
    : [400, 700, 1000]
        .map((width) => `${imageUrl(d, width)} ${width}w`)
        .join(", ");
}

// Descreve o portfólio sem apresentá-lo como uma agência real.
const structuredData = document.createElement("script");
structuredData.type = "application/ld+json";
structuredData.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Destinos para inspirar sua viagem",
  itemListElement: destinations.map((destination, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "TouristDestination",
      name: destination.name,
      description: destination.long,
    },
  })),
});
document.head.append(structuredData);
