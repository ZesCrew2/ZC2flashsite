import { Microsite } from "./microsite.js";
import { loadPage } from "./pageloader.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoIdleWrap = document.getElementById("logo-idle-wrap");
  let logoClickCount = 0;
  let logoClickTimeout: number | null = null;

  if (logoIdleWrap) {
    logoIdleWrap.addEventListener("click", () => {
      logoClickCount++;
      if (logoClickTimeout) clearTimeout(logoClickTimeout);
      logoClickTimeout = window.setTimeout(() => (logoClickCount = 0), 1000);

      if (Math.random() < 0.05) {
        if (Microsite.maze) {
          if (Microsite.assets && Microsite.assets.loadDeferred) {
            Microsite.assets.loadDeferred().then(() => Microsite.maze!.init());
          } else {
            Microsite.maze.init();
          }
          return;
        }
      }

      loadPage("orange");
    });
  }

  const buttons = document.querySelectorAll("#buttons .btn");
  const validColors = ["red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple", "pink"];

  buttons.forEach((btn) => {
    const color = [...btn.classList].find((c) => validColors.includes(c));
    if (color) {
      btn.addEventListener("click", () => {
        if (color === "cyan") {
          window.open("https://forum.zescrew2.art/", "_blank");
        } else {
          loadPage(color);
        }
      });
    }
  });
});
