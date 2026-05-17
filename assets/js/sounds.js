// written by thorns

(function() {
    function init() {
        // register sounds with createjs.Sound --thorns
        if (typeof createjs !== 'undefined' && createjs.Sound) {
            createjs.Sound.registerSound('assets/sounds/hover.wav', 'hoverwav');
            createjs.Sound.registerSound('assets/sounds/clicky.wav', 'clickywav');
            createjs.Sound.registerSound('assets/sounds/click.webm', 'notifwav');
            createjs.Sound.registerSound('assets/sounds/mk64_luigi01.wav', 'luigi1');
            createjs.Sound.registerSound('assets/sounds/mk64_luigi02.wav', 'luigi2');
            createjs.Sound.registerSound('assets/sounds/mk64_luigi03.wav', 'luigi3');
            createjs.Sound.registerSound('assets/sounds/mk64_luigi06.wav', 'luigi4');
        }

        // button sounds
        document.addEventListener('mouseover', function(e) {
            if (e.target.classList.contains('btn')) {
                Microsite.audio.play('hoverwav');
            }
        });

        document.addEventListener('mousedown', function(e) {
            if (e.target.classList.contains('btn')) {
                Microsite.audio.play('clickywav');
            }
        });

        // speaker hover
        const speaker = document.getElementById('speaker');
        if (speaker) {
            speaker.addEventListener('mouseover', function() {
                Microsite.audio.play('hoverwav');
            });
        }

        // saptarshi sound
        const saptarshi = document.querySelector('.saptarshi-text');
        if (saptarshi) {
            saptarshi.addEventListener('click', function() {
                Microsite.audio.play('notifwav');
            });
        }

        // thorns sound
        const thorns = document.querySelector('.thorns-text');
        const luigiIds = ['luigi1', 'luigi2', 'luigi3', 'luigi4'];
        if (thorns) {
            thorns.addEventListener('click', function() {
                const randomId = luigiIds[Math.floor(Math.random() * luigiIds.length)];
                Microsite.audio.play(randomId);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
