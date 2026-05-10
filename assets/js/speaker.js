// written by thorns

(function() {
    window.siteAudio = {
        isMuted: true
    };

    function init() {
        const speaker = document.getElementById('speaker');
        const clickSound = new Audio('assets/sounds/clicky.wav');

        function toggleMute() {
            window.siteAudio.isMuted = !window.siteAudio.isMuted;
            if (window.siteAudio.isMuted) {
                speaker.classList.remove('unmuted');
            } else {
                speaker.classList.add('unmuted');
                clickSound.play().catch(e => console.log("Audio play blocked:", e));
            }
        }

        if (speaker) {
            speaker.addEventListener('click', toggleMute);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
