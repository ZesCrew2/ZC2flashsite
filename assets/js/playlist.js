// playlist data for the WMP (thorns)
window.musicPlaylist = [
  { path: "assets/music/gleeble.mp3", name: "Lily (ZesCrew2) - Gleeble" },
  {
    path: "assets/music/Virgill - Interference Ending.mp3",
    name: "Virgill - Interference Ending",
  },
  {
    path: "assets/music/Mario Paint - Monkey Song.mp3",
    name: "Mario Paint - Monkey Song",
  },
  {
    path: "assets/music/Animal Crossing - Town Hall (Pelly).mp3",
    name: "Animal Crossing - Town Hall (Pelly)",
  },
  {
    path: "assets/music/EarthBound - Your Name, Please (Noiseless).mp3",
    name: "EarthBound - Your Name, Please (Noiseless)",
  },
  { path: "assets/music/QT - Main Song.mp3", name: "QT - Main Song" },
  {
    path: "assets/music/blue switch palace - super mario world [SPC700] (fantrack) - thorns.mp3",
    name: "Thorns - Blue Switch Palace [SPC700]",
  },
  {
    path: "assets/music/Lily (ZesCrew2) - Bejuel (Inst).mp3",
    name: "Lily (ZesCrew2) - Bejuel (Inst)",
  },
  {
    path: "assets/music/All The Things She Said (Sped Up, Inst).mp3",
    name: "t.A.T.u. - All The Things She Said (Sped Up, Inst)",
  },
  { path: "assets/music/Kalimba.mp3", name: "Mr. Scruff - Kalimba" },
  {
    path: "assets/music/weegee.mp3",
    name: 'sephfire, SGX - Mario Paint "Intense Color" OC ReMix',
  },
  {
    path: "assets/music/Drown in the Now.mp3",
    name: "The Crystal Method (Feat. Matisyahu) - Drown in the Now",
  },
  {
    path: "assets/music/Somebodys Watching Me (Instrumental).mp3",
    name: "Mysto and Pizzi - Somebodys Watching Me (Instrumental)",
  },
  {
    path: "assets/music/Lets Kill Tonight (Instrumental).mp3",
    name: "Panic! at the Disco - Lets Kill Tonight (Instrumental)",
  },
  {
    path: "assets/music/Your Game is Over (Instrumental).mp3",
    name: "MiatriSs - Your Game is Over (Instrumental)",
  },
  {
    path: "assets/music/seven color generator inst.mp3",
    name: "渡辺未来 - 七色ジェネレーター (Off-Vocal)",
  },
];

(() => {
  const init = () => {
    const player = document.getElementById("wmp");
    if (!player) return;

    window.musicPlaylist.forEach((track) => {
      player.addToPlaylist(
        new WMPlaylistItem({
          src: track.path,
          audio_only: false,
          metadata: { title: track.name },
          poster: "assets/img/bg.png",
        }),
      );
    });

    const updateTitle = () => {
      if (!player.shadowRoot) return;
      const current = player.currentItem;
      const overlay = player.shadowRoot.querySelector(".title-overlay");
      if (overlay && current && current.metadata) {
        const titleText = current.metadata.title || "Unknown Track";
        if (overlay.textContent !== titleText) {
          overlay.textContent = titleText;
        }
      }
    };

    // Event-driven: listen for track changes instead of polling every 500ms --thorns
    player.addEventListener("playlistitemchange", updateTitle);
    player.addEventListener("play", updateTitle);
    player.addEventListener("playing", updateTitle);

    // Fallback: MutationObserver on shadowRoot for custom elements that don't
    // fire standard events reliably --thorns
    const setupObserver = () => {
      if (!player.shadowRoot) {
        // Shadow root may not be ready yet; retry once --thorns
        requestAnimationFrame(setupObserver);
        return;
      }
      const observer = new MutationObserver(updateTitle);
      observer.observe(player.shadowRoot, { childList: true, subtree: true, characterData: true });
    };
    setupObserver();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
