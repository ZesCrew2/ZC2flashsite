interface GridEntity {
  x: number;
  y: number;
  type: number;
  id: string;
  targetId: string;
}

interface GridState {
  w: number;
  h: number;
  selectedType: string;
  map: number[][];
  entities: GridEntity[];
  spawn: { x: number; y: number };
  isDrawing: boolean;
  selectedCell: { x: number; y: number } | null;
}

const state: GridState = {
  w: 10,
  h: 10,
  selectedType: "1",
  map: [],
  entities: [],
  spawn: { x: 1.5, y: 1.5 },
  isDrawing: false,
  selectedCell: null,
};

const container = document.getElementById("grid-container");
const inputW = document.getElementById("grid-w") as HTMLInputElement | null;
const inputH = document.getElementById("grid-h") as HTMLInputElement | null;
const palette = document.getElementById("palette");
const metaPanel = document.getElementById("metadata-panel");
const metaFields = document.getElementById("meta-fields");

function createGrid(): void {
  if (!container || !inputW || !inputH) return;
  state.w = parseInt(inputW.value, 10);
  state.h = parseInt(inputH.value, 10);

  container.style.gridTemplateColumns = `repeat(${state.w}, 20px)`;
  container.style.gridTemplateRows = `repeat(${state.h}, 20px)`;
  container.innerHTML = "";

  state.map = Array.from({ length: state.h }, () => Array(state.w).fill(0));
  state.entities = [];

  for (let y = 0; y < state.h; y++) {
    for (let x = 0; x < state.w; x++) {
      const cell = document.createElement("div");
      cell.className = "cell type-0";
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);

      cell.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          state.isDrawing = true;
          paint(cell);
        }
      });
      cell.addEventListener("mouseenter", () => {
        if (state.isDrawing) paint(cell);
      });
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        selectCell(cell);
      });

      container.appendChild(cell);
    }
  }
}

function paint(cell: HTMLElement): void {
  const x = parseInt(cell.dataset.x!, 10);
  const y = parseInt(cell.dataset.y!, 10);
  const type = state.selectedType;

  cell.className = "cell type-" + type;

  if (type === "P") {
    const oldSpawn = document.querySelector(".type-P");
    if (oldSpawn) oldSpawn.className = "cell type-0";
    state.spawn = { x: x + 0.5, y: y + 0.5 };
    state.map[y][x] = 0;
  } else {
    const intType = parseInt(type, 10);
    state.map[y][x] = intType;

    state.entities = state.entities.filter((e) => e.x !== x || e.y !== y);
    if (intType === 2 || intType === 3) {
      state.entities.push({ x, y, type: intType, id: `ent_${x}_${y}`, targetId: "" });
    }
  }
}

function selectCell(cell: HTMLElement): void {
  const x = parseInt(cell.dataset.x!, 10);
  const y = parseInt(cell.dataset.y!, 10);
  const type = state.map[y][x];

  state.selectedCell = { x, y };
  document.querySelectorAll(".cell").forEach((c) => ((c as HTMLElement).style.borderColor = "#444"));
  cell.style.borderColor = "white";

  if (type === 2 || type === 3) {
    const entity = state.entities.find((e) => e.x === x && e.y === y);
    showMeta(entity!);
  } else if (metaPanel) {
    metaPanel.style.display = "none";
  }
}

function showMeta(entity: GridEntity): void {
  if (!metaPanel || !metaFields) return;
  metaPanel.style.display = "block";
  metaFields.innerHTML = `
    <label>ID:</label>
    <input type="text" value="${entity.id}" onchange="updateEntity('${entity.x}', '${entity.y}', 'id', this.value)"><br><br>
    ${entity.type === 2 ? `
      <label>Target Door ID:</label>
      <input type="text" value="${entity.targetId}" onchange="updateEntity('${entity.x}', '${entity.y}', 'targetId', this.value)">
    ` : ""}
  `;
}

(window as Window & { updateEntity?: (x: number, y: number, key: string, val: string) => void }).updateEntity = (x, y, key, val) => {
  const entity = state.entities.find((e) => e.x == x && e.y == y);
  if (entity) (entity as unknown as Record<string, string>)[key] = val;
};

palette?.addEventListener("click", (e) => {
  const tool = (e.target as HTMLElement).closest(".tool");
  if (!tool) return;
  document.querySelectorAll(".tool").forEach((t) => t.classList.remove("active"));
  tool.classList.add("active");
  state.selectedType = (tool as HTMLElement).dataset.type!;
});

window.addEventListener("mouseup", () => (state.isDrawing = false));

inputW?.addEventListener("input", createGrid);
inputH?.addEventListener("input", createGrid);

createGrid();

document.getElementById("export-btn")?.addEventListener("click", () => {
  const buttons = state.entities
    .filter((e) => e.type === 2)
    .map((e) => ({ x: e.x, y: e.y, state: "closed", targetId: e.targetId }));

  const doors = state.entities
    .filter((e) => e.type === 3)
    .map((e) => ({ id: e.id, tiles: [{ x: e.x, y: e.y }], offsetY: 0.0, state: "closed" }));

  const code = `
// REPLACABLE MAP DATA FOR maze.ts --thorns
map: ${JSON.stringify(state.map, null, 2)},

buttons: ${JSON.stringify(buttons, null, 2)},

doors: ${JSON.stringify(doors, null, 2)},

player: {
  x: ${state.spawn.x},
  y: ${state.spawn.y},
  // ... rest of player props
},
  `;
  console.log(code);
  alert("Level Data exported to console! Copy it into maze.ts.");
});

export {};
