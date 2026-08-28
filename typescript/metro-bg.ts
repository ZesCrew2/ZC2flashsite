const iconFiles = [
  "arrow 1.svg", "arrow 2.svg", "arrow 3.svg", "birds.svg", "buildings 1.svg",
  "butterfly.svg", "circles 1.svg", "circles 10.svg", "circles 11.svg",
  "circles 12.svg", "circles 13.svg", "circles 14.svg", "circles 15.svg",
  "circles 16.svg", "circles 2.svg", "circles 3.svg", "circles 4.svg",
  "circles 6.svg", "circles 7.svg", "circles 8.svg", "circles 9.svg",
  "cloud.svg", "drip 1.svg", "drip 2.svg", "drip 3.svg", "drip 4.svg",
  "grid 1.svg", "grid 2.svg", "grid 3.svg", "man 1.svg", "man 2.svg",
  "man 3.svg", "man 4.svg", "olympic.svg", "record 1.svg", "reload.svg",
  "speaker 1.svg", "speaker 2.svg", "splat 1.svg", "splat 10.svg",
  "splat 11.svg", "splat 2.svg", "splat 3.svg", "splat 4.svg", "splat 5.svg",
  "splat 6.svg", "splat 7.svg", "splat 8.svg", "splat 9.svg", "star 1.svg",
  "star 2.svg", "star 3.svg", "star 4.svg", "star 5.svg", "star ring.svg",
  "starish 1.svg", "starish 2.svg", "starish 3.svg", "sunrays 1.svg",
  "sunrays 2.svg", "sunrays 3.svg", "sunrays 4.svg", "sunrays 5.svg",
  "sunrays 6.svg", "swirl 1.svg", "swirl 10.svg", "swirl 11.svg",
  "swirl 12.svg", "swirl 13.svg", "swirl 14.svg", "swirl 16.svg",
  "swirl 2.svg", "swirl 3.svg", "swirl 4.svg", "swirl 5.svg", "swirl 6.svg",
  "swirl 7.svg", "swirl 8.svg", "swirl 9.svg", "tree 1.svg", "tree 2.svg",
  "zc2 cyan.svg", "zc2 orange.svg", "zc2 pink.svg",
];

let container = document.getElementById("metro-icons-container");
if (!container) {
  container = document.createElement("div");
  container.id = "metro-icons-container";
  document.body.prepend(container);
}

const activeIcons = new Set<{
  element: HTMLImageElement;
  startTime: number;
  duration: number;
  startX: number;
  endX: number;
  rotationStart: number;
  rotationEnd: number;
}>();

function spawnIcon(): void {
  const iconFile = iconFiles[Math.floor(Math.random() * iconFiles.length)];
  const icon = document.createElement("img");
  icon.src = `assets/img/metro/${iconFile}`;
  icon.className = "metro-icon";

  const size = Math.random() * 40 + 30;
  icon.style.width = `${size}px`;
  icon.style.height = "auto";

  const startY = Math.random() * window.innerHeight;
  const direction = Math.random() > 0.5 ? 1 : -1;
  const startX = direction === 1 ? -size - 50 : window.innerWidth + 50;
  const endX = direction === 1 ? window.innerWidth + size + 50 : -size - 50;

  icon.style.top = `${startY}px`;
  icon.style.left = `${startX}px`;

  const duration = Math.random() * 10000 + 10000;
  const rotationStart = Math.random() * 360;
  const rotationEnd = rotationStart + (Math.random() * 720 - 360);

  container!.appendChild(icon);

  activeIcons.add({
    element: icon,
    startTime: performance.now(),
    duration,
    startX,
    endX,
    rotationStart,
    rotationEnd,
  });
}

function animate(currentTime: number): void {
  activeIcons.forEach((iconData) => {
    const elapsed = currentTime - iconData.startTime;
    const progress = Math.min(elapsed / iconData.duration, 1);

    const currentX = iconData.startX + (iconData.endX - iconData.startX) * progress;
    const currentRotation = iconData.rotationStart + (iconData.rotationEnd - iconData.rotationStart) * progress;

    iconData.element.style.transform = `translateX(${currentX - iconData.startX}px) rotate(${currentRotation}deg)`;

    if (progress >= 1) {
      iconData.element.remove();
      activeIcons.delete(iconData);
    }
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

setInterval(spawnIcon, 2500);

for (let i = 0; i < 5; i++) {
  setTimeout(spawnIcon, Math.random() * 5000);
}

export {};
