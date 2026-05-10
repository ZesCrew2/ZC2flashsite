(function() {
    let titleText = "Welcome to ZC2!! - ";
    
    setInterval(() => {
        titleText = titleText.substring(1) + titleText[0];
        document.title = titleText;
    }, 250);
})();
