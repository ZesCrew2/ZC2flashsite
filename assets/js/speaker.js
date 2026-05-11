// written by thorns

(function() {
    window.siteAudio = { isMuted: true };

    function init() {
        const speaker = document.getElementById('speaker');
        const musicPlayer = document.getElementById('music-player');
        const restoreBtn = document.getElementById('music-restore');
        const clickSound = new Audio('assets/sounds/clicky.wav');
        
        const playlist = window.musicPlaylist || [];
        let currentIndex = -1;
        let bgMusic = null;
        let hasStarted = false;
        let isPaused = false;

        function updatePlayPauseButton() {
            const btn = document.getElementById('btn-play-pause');
            if (btn) btn.textContent = isPaused ? 'Play' : 'Pause';
        }

        function updateProgress() {
            if (!bgMusic) return;
            const progressBar = document.getElementById('progress-bar');
            if (progressBar && bgMusic.duration) {
                const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
                progressBar.style.width = percent + '%';
            }
        }

        function playTrack(index) {
            if (bgMusic) {
                bgMusic.pause();
                bgMusic.removeEventListener('ended', playNext);
            }
            currentIndex = index;
            isPaused = false;
            updatePlayPauseButton();
            const track = playlist[currentIndex];
            bgMusic = new Audio(track.path);
            bgMusic.volume = 0.50;
            bgMusic.addEventListener('ended', playNext);
            bgMusic.addEventListener('timeupdate', updateProgress);
            
            const trackNameDisplay = document.getElementById('track-name');
            if (trackNameDisplay) trackNameDisplay.textContent = track.name;
            
            if (!window.siteAudio.isMuted) {
                bgMusic.play().catch(e => console.log("Music play blocked:", e));
            }
        }

        function playNext() {
            let nextIndex = (currentIndex + 1) % playlist.length;
            playTrack(nextIndex);
        }

        function playPrev() {
            let prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            playTrack(prevIndex);
        }

        const nextBtn = document.getElementById('btn-next');
        const prevBtn = document.getElementById('btn-prev');
        const playPauseBtn = document.getElementById('btn-play-pause');
        if (nextBtn) nextBtn.addEventListener('click', () => {
            clickSound.play().catch(e => {});
            playNext();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            clickSound.play().catch(e => {});
            playPrev();
        });
        if (playPauseBtn) playPauseBtn.addEventListener('click', () => {
            clickSound.play().catch(e => {});
            if (bgMusic) {
                if (isPaused) {
                    bgMusic.play();
                    isPaused = false;
                } else {
                    bgMusic.pause();
                    isPaused = true;
                }
                updatePlayPauseButton();
            }
        });

        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                if (bgMusic && bgMusic.duration) {
                    bgMusic.currentTime = percent * bgMusic.duration;
                    updateProgress();
                }
            });
        }

        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const vol = e.target.value / 100;
                if (bgMusic) bgMusic.volume = vol;
                const statusVolume = document.querySelector('.status-bar-field:last-child');
                if (statusVolume) statusVolume.textContent = 'Volume: ' + e.target.value + '%';
            });
        }

        speaker.addEventListener('click', () => {
            window.siteAudio.isMuted = !window.siteAudio.isMuted;
            restoreBtn.style.display = 'none';
            if (window.siteAudio.isMuted) {
                speaker.classList.remove('unmuted');
                musicPlayer.classList.remove('show');
                if (bgMusic) bgMusic.pause();
            } else {
                    speaker.classList.add('unmuted');
                    musicPlayer.classList.add('show');
                    
                    if (!hasStarted) {
                        hasStarted = true;
                        isPaused = false;
                        playTrack(Math.floor(Math.random() * playlist.length));
                    } else {
                        if (bgMusic) {
                            if (isPaused) {
                                bgMusic.play();
                                isPaused = false;
                                updatePlayPauseButton();
                            }
                            bgMusic.play().catch(e => console.log("Music play blocked:", e));
                        }
                    }
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
            let x = e.clientX - dragOffsetX;
            let y = e.clientY - dragOffsetY;
            x = Math.max(0, Math.min(x, window.innerWidth - musicPlayer.offsetWidth));
            y = Math.max(0, Math.min(y, window.innerHeight - musicPlayer.offsetHeight));
            musicPlayer.style.left = x + 'px';
            musicPlayer.style.top = y + 'px';
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
