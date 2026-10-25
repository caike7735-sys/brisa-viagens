import { destinations } from "./data.js";
import { $ } from "./utils.js";
import { render } from "./render.js";
import { bindEvents } from "./events.js";
import { clearLegacyEmail } from "./state.js";
clearLegacyEmail();
bindEvents();
const today = new Date();
$("#travel-date").min =
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
$("#year").textContent = today.getFullYear();
render();
// Descreve o portfólio sem apresentá-lo como uma agência real.
const structuredData = document.createElement("script");
structuredData.type = "application/ld+json";
structuredData.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Brisa Viagens",
  url: "https://caike7735-sys.github.io/brisa-viagens/",
  description:
    "Portfólio demonstrativo para inspiração e planejamento de viagens, sem reservas ou vendas.",
  mainEntity: {
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
  },
});
document.head.append(structuredData);
