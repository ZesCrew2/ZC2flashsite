// written by thorns

(() => {
  const init = () => {
    // Define global playSound for Adobe Animate compatibility if not already defined --thorns
    if (typeof window.playSound !== "function") {
      window.playSound = function(id, loop, offset) {
        if (window.siteAudio && window.siteAudio.isMuted) return null;
        return createjs.Sound.play(id, {
          interrupt: createjs.Sound.INTERRUPT_ANY,
          loop: loop || 0,
          offset: offset || 0
        });
      };
    }

    // button sounds
    document.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("btn")) {
        Microsite.audio.play("site_hover");
      }
    });

    document.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("btn")) {
        Microsite.audio.play("site_click");
      }
    });

    // speaker hover
    const speaker = document.getElementById("speaker");
    if (speaker) {
      speaker.addEventListener("mouseover", () => {
        Microsite.audio.play("site_hover");
      });
    }

    // saptarshi sound
    const saptarshi = document.querySelector(".saptarshi-text");
    if (saptarshi) {
      saptarshi.addEventListener("click", () => {
        Microsite.audio.play("site_notif");
      });
    }

    // thorns sound
    const thorns = document.querySelector(".thorns-text");
    const luigiIds = ["luigi1", "luigi2", "luigi3", "luigi4"];
    if (thorns) {
      thorns.addEventListener("click", () => {
        const randomId = luigiIds[Math.floor(Math.random() * luigiIds.length)];
        Microsite.audio.play(randomId);
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
