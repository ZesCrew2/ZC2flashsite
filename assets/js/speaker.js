// written by thorns

(function() {
    window.siteAudio = { isMuted: true };

    function init() {
        var speaker = document.getElementById('speaker');
        var musicPlayer = document.getElementById('music-player');
        var restoreBtn = document.getElementById('music-restore');
        var clickSound = new Audio('assets/sounds/clicky.wav');
        var wmp = document.getElementById('wmp');

        var hasStarted = false;

        wmp.volume = 0.5;

        speaker.addEventListener('click', function() {
            restoreBtn.style.display = 'none';
            window.siteAudio.isMuted = !window.siteAudio.isMuted;

            if (window.siteAudio.isMuted) {
                speaker.classList.remove('unmuted');
                musicPlayer.classList.remove('show');
                wmp.pause();
            } else {
                speaker.classList.add('unmuted');
                musicPlayer.classList.add('show');

                if (!hasStarted) {
                    hasStarted = true;
                    wmp.currentPlaylistIndex = Math.floor(Math.random() * window.musicPlaylist.length);
                    wmp.play();
                } else {
                    wmp.play();
                }
                clickSound.play().catch(function() {});
            }
        });

        var isDragging = false, dragOffsetX, dragOffsetY;
        var titleBar = musicPlayer.querySelector('.title-bar');

        titleBar.addEventListener('mousedown', function(e) {
            if (e.target.closest('.title-bar-controls')) return;
            isDragging = true;
            var rect = musicPlayer.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            musicPlayer.style.right = 'auto';
            musicPlayer.style.bottom = 'auto';
            musicPlayer.style.left = rect.left + 'px';
            musicPlayer.style.top = rect.top + 'px';
            musicPlayer.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            var x = e.clientX - dragOffsetX;
            var y = e.clientY - dragOffsetY;
            x = Math.max(0, Math.min(x, window.innerWidth - musicPlayer.offsetWidth));
            y = Math.max(0, Math.min(y, window.innerHeight - musicPlayer.offsetHeight));
            musicPlayer.style.left = x + 'px';
            musicPlayer.style.top = y + 'px';
        });

        document.addEventListener('mouseup', function() {
            if (!isDragging) return;
            isDragging = false;
            musicPlayer.classList.remove('dragging');
        });

        function setFly() {
            var r = musicPlayer.getBoundingClientRect();
            musicPlayer.style.setProperty('--fly-x', ((window.innerWidth - 20) - r.right) + 'px');
            musicPlayer.style.setProperty('--fly-y', ((window.innerHeight - 20) - r.bottom) + 'px');
        }

        function flyAway() {
            if (!musicPlayer.classList.contains('show') || musicPlayer.classList.contains('minimizing')) return;
            var active = document.activeElement;
            if (active && active.closest && active.closest('.title-bar-controls')) active.blur();
            setFly();
            musicPlayer.classList.add('minimizing');
            musicPlayer.addEventListener('animationend', function() {
                musicPlayer.classList.remove('show', 'minimizing');
                if (!window.siteAudio.isMuted) restoreBtn.style.display = 'block';
            }, { once: true });
        }

        var closeButton = musicPlayer.querySelector('button[aria-label="Close"]');
        var minimizeButton = musicPlayer.querySelector('button[aria-label="Minimize"]');

        function blockSpaceOnWindowControls(e) {
            if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        closeButton.addEventListener('keydown', blockSpaceOnWindowControls);
        minimizeButton.addEventListener('keydown', blockSpaceOnWindowControls);
        closeButton.addEventListener('click', flyAway);
        minimizeButton.addEventListener('click', flyAway);
        musicPlayer.querySelector('button[aria-label="Maximize"]').disabled = true;

        restoreBtn.addEventListener('click', function() {
            setFly();
            musicPlayer.classList.add('show', 'restoring');
            restoreBtn.style.display = 'none';
            musicPlayer.addEventListener('animationend', function() {
                musicPlayer.classList.remove('restoring');
            }, { once: true });
        });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();
