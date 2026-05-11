// written by thorns

(function() {
    window.siteAudio = { isMuted: true };

    function init() {
        const speaker = document.getElementById('speaker');
        const musicPlayer = document.getElementById('music-player');
        const restoreBtn = document.getElementById('music-restore');
        const clickSound = new Audio('assets/sounds/clicky.wav');
        const bgMusic = new Audio('assets/music/Virgill - Interference Ending.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.50;

        speaker.addEventListener('click', () => {
            window.siteAudio.isMuted = !window.siteAudio.isMuted;
            restoreBtn.style.display = 'none';
            if (window.siteAudio.isMuted) {
                speaker.classList.remove('unmuted');
                musicPlayer.classList.remove('show');
                bgMusic.pause();
            } else {
                speaker.classList.add('unmuted');
                musicPlayer.classList.add('show');
                bgMusic.play().catch(e => console.log("Music play blocked:", e));
                clickSound.play().catch(e => console.log("Audio play blocked:", e));
            }
        });

        let isDragging = false, dragOffsetX, dragOffsetY;
        const titleBar = musicPlayer.querySelector('.title-bar');

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.title-bar-controls')) return;
            isDragging = true;
            const rect = musicPlayer.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            musicPlayer.style.right = 'auto';
            musicPlayer.style.bottom = 'auto';
            musicPlayer.style.left = rect.left + 'px';
            musicPlayer.style.top = rect.top + 'px';
            musicPlayer.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            musicPlayer.style.left = (e.clientX - dragOffsetX) + 'px';
            musicPlayer.style.top = (e.clientY - dragOffsetY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            musicPlayer.classList.remove('dragging');
        });

        function setFly() {
            const r = musicPlayer.getBoundingClientRect();
            musicPlayer.style.setProperty('--fly-x', ((window.innerWidth - 20) - r.right) + 'px');
            musicPlayer.style.setProperty('--fly-y', ((window.innerHeight - 20) - r.bottom) + 'px');
        }

        function flyAway() {
            setFly();
            musicPlayer.classList.add('minimizing');
            musicPlayer.addEventListener('animationend', () => {
                musicPlayer.classList.remove('show', 'minimizing');
                if (!window.siteAudio.isMuted) restoreBtn.style.display = 'block';
            }, { once: true });
        }

        musicPlayer.querySelector('button[aria-label="Close"]').addEventListener('click', flyAway);
        musicPlayer.querySelector('button[aria-label="Minimize"]').addEventListener('click', flyAway);
        musicPlayer.querySelector('button[aria-label="Maximize"]').disabled = true;

        restoreBtn.addEventListener('click', () => {
            setFly();
            musicPlayer.classList.add('show', 'restoring');
            restoreBtn.style.display = 'none';
            musicPlayer.addEventListener('animationend', () => {
                musicPlayer.classList.remove('restoring');
            }, { once: true });
        });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();
