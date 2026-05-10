// written by thorns

(function() {
    const hoverSound = new Audio('assets/sounds/hover.wav');
    const clickSound = new Audio('assets/sounds/clicky.wav');

    function init() {
        document.addEventListener('mouseover', function(e) {
            if (window.siteAudio && !window.siteAudio.isMuted && e.target.classList.contains('btn')) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(e => {});
            }
        });

        document.addEventListener('mousedown', function(e) {
            if (window.siteAudio && !window.siteAudio.isMuted && e.target.classList.contains('btn')) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => {});
            }
        });

        // special case for speaker button itself
        const speaker = document.getElementById('speaker');
        if (speaker) {
            speaker.addEventListener('mouseover', function() {
                if (window.siteAudio && !window.siteAudio.isMuted) {
                    hoverSound.currentTime = 0;
                    hoverSound.play().catch(e => {});
                }
            });
        }

        // saptarshi sound effects
        const saptarshi = document.querySelector('.saptarshi-text');
        const notifSound = new Audio('assets/sounds/notification.ogg');

        if (saptarshi) {
            saptarshi.addEventListener('click', function() {
                if (window.siteAudio && !window.siteAudio.isMuted) {
                    notifSound.currentTime = 0;
                    notifSound.play().catch(e => {});
                }
            });
        }

        // thorns sound effects
        const thorns = document.querySelector('.thorns-text');
        const luigiSounds = [
            new Audio('assets/sounds/mk64_luigi01.wav'),
            new Audio('assets/sounds/mk64_luigi02.wav'),
            new Audio('assets/sounds/mk64_luigi03.wav'),
            new Audio('assets/sounds/mk64_luigi06.wav')
        ];

        if (thorns) {
            thorns.addEventListener('click', function(e) {
                if (window.siteAudio && !window.siteAudio.isMuted) {
                    const randomSound = luigiSounds[Math.floor(Math.random() * luigiSounds.length)];
                    randomSound.currentTime = 0;
                    randomSound.play().catch(e => {});
                }
            });
        }
        }




    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
