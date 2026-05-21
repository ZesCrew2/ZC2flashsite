document.addEventListener("DOMContentLoaded", () => {
  // logo click handler
  const logoIdleWrap = document.getElementById("logo-idle-wrap");
  if (logoIdleWrap) {
    logoIdleWrap.addEventListener("click", () => {
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
        loadPage(color);
      });
    }
  });
});
