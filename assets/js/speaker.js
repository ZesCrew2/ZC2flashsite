// written by thorns

(function() {
    window.siteAudio = {
        isMuted: true
    };

    function init() {
        const speaker = document.getElementById('speaker');
        const musicPlayer = document.getElementById('music-player');
        const restoreBtn = document.getElementById('music-restore');
        const clickSound = new Audio('assets/sounds/clicky.wav');
        const bgMusic = new Audio('assets/music/Virgill - Interference Ending.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.50;

        function toggleMute() {
            window.siteAudio.isMuted = !window.siteAudio.isMuted;
            if (window.siteAudio.isMuted) {
                speaker.classList.remove('unmuted');
                musicPlayer.classList.remove('show');
                restoreBtn.style.display = 'none';
                bgMusic.pause();
            } else {
                speaker.classList.add('unmuted');
                musicPlayer.classList.add('show');
                restoreBtn.style.display = 'none';
                bgMusic.play().catch(e => console.log("Music play blocked:", e));
                clickSound.play().catch(e => console.log("Audio play blocked:", e));
            }
        }

        if (speaker) {
            speaker.addEventListener('click', toggleMute);
        }

        // Window control functionality
        const closeBtn = musicPlayer.querySelector('button[aria-label="Close"]');
        const minBtn = musicPlayer.querySelector('button[aria-label="Minimize"]');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                musicPlayer.classList.remove('show');
                if (!window.siteAudio.isMuted) restoreBtn.style.display = 'block';
            });
        }

        if (minBtn) {
            minBtn.addEventListener('click', () => {
                musicPlayer.classList.remove('show');
                if (!window.siteAudio.isMuted) restoreBtn.style.display = 'block';
            });
        }

        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => {
                musicPlayer.classList.add('show');
                restoreBtn.style.display = 'none';
            });
        }

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
