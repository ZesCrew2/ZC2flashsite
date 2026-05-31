// written by thorns

(function () {
  function init() {
    const logo = document.getElementById("logo");

    if (logo) {
      logo.addEventListener("click", function () {
        // have this play when not muted
        if (window.siteAudio && !window.siteAudio.isMuted) {
          Microsite.audio.play("site_medal");
        }

        // animation thingy
        logo.classList.remove("logo-clicked");
        void logo.offsetWidth;
        logo.classList.add("logo-clicked");

        logo.addEventListener(
          "animationend",
          function () {
            logo.classList.remove("logo-clicked");
          },
          { once: true },
        );
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
