let titleText = "Welcome to ZC2!! - ";

function updateTitle(): void {
  titleText = titleText.substring(1) + titleText[0];
  document.title = titleText;
}

setInterval(updateTitle, 250);

export {};
