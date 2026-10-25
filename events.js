import { $ } from "./utils.js";
import { icon } from "./icons.js";
import { state, toggleFavorite as changeFavorite } from "./state.js";
import { render, reset, details, updateFavorites, toast } from "./render.js";

function toggleFavorite(id) {
  const result = changeFavorite(id);
  if (!result) return;
  toast(
    result.persisted
      ? result.saved
        ? "Destino salvo! Encontre em Minhas viagens."
        : "Destino removido das suas viagens."
      : "Salvo nesta sessão. O armazenamento do navegador está indisponível.",
  );
  updateFavorites(id);
}
export function bindEvents() {
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
    $("#destinos").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  });
  $("#show-favorites").addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    state.category = "all";
    state.query = "";
    $("#destination-input").value = "";
    state.showAll = true;
    render();
    $("#destinos").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
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
      $("#destinos").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
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

  $("#destination-dialog").addEventListener("click", (event) => {
    const button = event.target.closest("#save-from-dialog");
    if (!button) return;
    const id = button.dataset.destination;
    toggleFavorite(id);
    button.innerHTML =
      icon("heart") +
      (state.favorites.includes(id)
        ? "Remover das minhas viagens"
        : "Salvar nas minhas viagens");
  });
}
