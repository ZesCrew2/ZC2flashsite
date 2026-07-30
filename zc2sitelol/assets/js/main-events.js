document.addEventListener("DOMContentLoaded", () => {
  // logo click handler
  const logoIdleWrap = document.getElementById("logo-idle-wrap");
  let logoClickCount = 0;
  let logoClickTimeout = null;

  if (logoIdleWrap) {
    logoIdleWrap.addEventListener("click", () => {
      // 5% chance to trigger maze
      if (Math.random() < 0.05) {
        if (window.Microsite && window.Microsite.maze) {
          // Load deferred maze assets before starting --thorns
          if (window.Microsite.assets && window.Microsite.assets.loadDeferred) {
            window.Microsite.assets.loadDeferred().then(() => {
              window.Microsite.maze.init();
            });
          } else {
            window.Microsite.maze.init();
          }
          return; // stop further execution
        }
      }
      
      loadPage("orange");
    });
  }

  // button handlers
  const buttons = document.querySelectorAll("#buttons .btn");
  const validColors = [
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "cyan",
    "blue",
    "purple",
    "pink",
  ];

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
