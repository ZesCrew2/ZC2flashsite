(function() {
    "use strict";

    const state = {
        w: 10,
        h: 10,
        selectedType: "1",
        map: [],
        entities: [], // { x, y, type, id, targetId }
        spawn: { x: 1.5, y: 1.5 },
        isDrawing: false,
        selectedCell: null
    };

    const container = document.getElementById('grid-container');
    const inputW = document.getElementById('grid-w');
    const inputH = document.getElementById('grid-h');
    const palette = document.getElementById('palette');
    const metaPanel = document.getElementById('metadata-panel');
    const metaFields = document.getElementById('meta-fields');

    function createGrid() {
        state.w = parseInt(inputW.value);
        state.h = parseInt(inputH.value);
        
        container.style.gridTemplateColumns = `repeat(${state.w}, 20px)`;
        container.style.gridTemplateRows = `repeat(${state.h}, 20px)`;
        container.innerHTML = '';

        state.map = Array.from({ length: state.h }, () => Array(state.w).fill(0));
        state.entities = [];

        for (let y = 0; y < state.h; y++) {
            for (let x = 0; x < state.w; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell type-0';
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                cell.addEventListener('mousedown', (e) => { 
                    if (e.button === 0) {
                        state.isDrawing = true; 
                        paint(cell); 
                    }
                });
                cell.addEventListener('mouseenter', () => { if (state.isDrawing) paint(cell); });
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    selectCell(cell);
                });
                
                container.appendChild(cell);
            }
        }
    }

    function paint(cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const type = state.selectedType;

        cell.className = 'cell type-' + type;

        if (type === "P") {
            const oldSpawn = document.querySelector('.type-P');
            if (oldSpawn) oldSpawn.className = 'cell type-0';
            state.spawn = { x: x + 0.5, y: y + 0.5 };
            state.map[y][x] = 0;
        } else {
            const intType = parseInt(type);
            state.map[y][x] = intType;

            // Manage entity list
            state.entities = state.entities.filter(e => e.x !== x || e.y !== y);
            if (intType === 2 || intType === 3) {
                state.entities.push({ x, y, type: intType, id: `ent_${x}_${y}`, targetId: "" });
            }
        }
    }

    function selectCell(cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const type = state.map[y][x];

        state.selectedCell = { x, y };
        document.querySelectorAll('.cell').forEach(c => c.style.borderColor = "#444");
        cell.style.borderColor = "white";

        if (type === 2 || type === 3) {
            const entity = state.entities.find(e => e.x === x && e.y === y);
            showMeta(entity);
        } else {
            metaPanel.style.display = "none";
        }
    }

    function showMeta(entity) {
        metaPanel.style.display = "block";
        metaFields.innerHTML = `
            <label>ID:</label>
            <input type="text" value="${entity.id}" onchange="updateEntity('${entity.x}', '${entity.y}', 'id', this.value)"><br><br>
            ${entity.type === 2 ? `
                <label>Target Door ID:</label>
                <input type="text" value="${entity.targetId}" onchange="updateEntity('${entity.x}', '${entity.y}', 'targetId', this.value)">
            ` : ''}
        `;
    }

    window.updateEntity = (x, y, key, val) => {
        const entity = state.entities.find(e => e.x == x && e.y == y);
        if (entity) entity[key] = val;
    };

    palette.addEventListener('click', (e) => {
        const tool = e.target.closest('.tool');
        if (!tool) return;
        document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
        tool.classList.add('active');
        state.selectedType = tool.dataset.type;
    });

    window.addEventListener('mouseup', () => state.isDrawing = false);

    inputW.addEventListener('input', createGrid);
    inputH.addEventListener('input', createGrid);

    createGrid();

    document.getElementById('export-btn').addEventListener('click', () => {
        const buttons = state.entities.filter(e => e.type === 2).map(e => ({
            x: e.x, y: e.y, state: "closed", targetId: e.targetId
        }));
        
        const doors = state.entities.filter(e => e.type === 3).map(e => {
            // Find door tiles (Doom doors can be multi-tile, let's keep it simple for now or assume 1 door entity = 1 tile or cluster)
            // For now, 1 entity = 1 door tile
            return {
                id: e.id,
                tiles: [{x: e.x, y: e.y}],
                offsetY: 0.0,
                state: "closed"
            };
        });

        const code = `
// REPLACABLE MAP DATA FOR maze.js --thorns
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
        alert("Level Data exported to console! Copy it into maze.js.");
    });

})();
