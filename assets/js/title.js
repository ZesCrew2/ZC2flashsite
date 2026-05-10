(function() {
    let titleText = "Welcome to ZC2!! - ";
    function updateTitle() {
        titleText = titleText.substring(1) + titleText[0];
        document.title = titleText;
    }
    setInterval(updateTitle, 250);
})();
