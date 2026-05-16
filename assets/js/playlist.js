// playlist data for the WMP (thorns)
window.musicPlaylist = [
    { path: 'assets/music/Virgill - Interference Ending.mp3', name: 'Virgill - Interference Ending' },
    { path: 'assets/music/Mario Paint - Monkey Song.mp3', name: 'Mario Paint - Monkey Song' },
    { path: 'assets/music/Animal Crossing - Town Hall (Pelly).mp3', name: 'Animal Crossing - Town Hall (Pelly)' },
    { path: 'assets/music/EarthBound - Your Name, Please (Noiseless).mp3', name: 'EarthBound - Your Name, Please (Noiseless)' },
    { path: 'assets/music/QT - Main Song.mp3', name: 'QT - Main Song' },
    { path: 'assets/music/Lily (ZesCrew2) - Bejuel (Inst).mp3', name: 'Lily (ZesCrew2) - Bejuel (Inst)' },
    { path: 'assets/music/All The Things She Said (Sped Up, Inst).mp3', name: 't.A.T.u. - All The Things She Said (Sped Up, Inst)' },
    { path: 'assets/music/Kalimba.mp3', name: 'Mr. Scruff - Kalimba' },
    { path: 'assets/music/weegee.mp3', name: 'sephfire, SGX - Mario Paint "Intense Color" OC ReMix' },
    { path: 'assets/music/Drown in the Now.mp3', name: 'The Crystal Method (Feat. Matisyahu) - Drown in the Now' },
    { path: 'assets/music/Your Game is Over (Instrumental).mp3', name: 'MiatriSs - Your Game is Over (Instrumental)' }
    { path: 'assets/music/blue switch palace - super mario world [SPC700] (fantrack) - thorns.mp3', name: 'Thorns - Blue Switch Palace [SPC700]' }
];

(function() {
    function init() {
        var player = document.getElementById('wmp');
        if (!player) return;
        for (var i = 0; i < window.musicPlaylist.length; i++) {
            var track = window.musicPlaylist[i];
            player.addToPlaylist(new WMPlaylistItem({
                src: track.path,
                audio_only: true
            }));
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
