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
    }



    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
