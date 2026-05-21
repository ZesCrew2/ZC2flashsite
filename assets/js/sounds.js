// written by thorns

(() => {
  const init = () => {
    // register sounds with createjs.Sound --thorns
    if (typeof createjs !== "undefined" && createjs.Sound) {
      const sounds = [
        { src: "assets/sounds/hover.wav", id: "hoverwav" },
        { src: "assets/sounds/clicky.wav", id: "clickywav" },
        { src: "assets/sounds/click.webm", id: "notifwav" },
        { src: "assets/sounds/mk64_luigi01.wav", id: "luigi1" },
        { src: "assets/sounds/mk64_luigi02.wav", id: "luigi2" },
        { src: "assets/sounds/mk64_luigi03.wav", id: "luigi3" },
        { src: "assets/sounds/mk64_luigi06.wav", id: "luigi4" },
      ];
      sounds.forEach((s) => createjs.Sound.registerSound(s.src, s.id));
    }

    // button sounds
    document.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("btn")) {
        Microsite.audio.play("hoverwav");
      }
    });

    document.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("btn")) {
        Microsite.audio.play("clickywav");
      }
    });

    // speaker hover
    const speaker = document.getElementById("speaker");
    if (speaker) {
      speaker.addEventListener("mouseover", () => {
        Microsite.audio.play("hoverwav");
      });
    }

    // saptarshi sound
    const saptarshi = document.querySelector(".saptarshi-text");
    if (saptarshi) {
      saptarshi.addEventListener("click", () => {
        Microsite.audio.play("notifwav");
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
