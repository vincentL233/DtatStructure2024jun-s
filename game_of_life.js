const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const startBtn = document.getElementById("startBtn");
        const stopBtn = document.getElementById("stopBtn");
        const stepBtn = document.getElementById("stepBtn");
        const randomBtn = document.getElementById("randomBtn");
        const clearBtn = document.getElementById("clearBtn");
        const generationCountElement = document.getElementById("generationCount");

        // 配置
        const rows = 40;
        const cols = 40;
        const cellSize = canvas.width / cols;
        const simulationSpeed = 100; // 毫秒

        // 遊戲狀態
        var grid = createGrid(rows, cols);
        var intervalId = null;
        var generation = 0;

        function createGrid(rows, cols) {
            return Array(rows).fill().map(() => Array(cols).fill(0));
        }

        function randomizeGrid() {
            grid = grid.map(row => row.map(() => Math.random() > 0.7 ? 1 : 0));
            generation = 0;
            updateGenerationDisplay();
            drawGrid();
        }

        function clearGrid() {
            grid = createGrid(rows, cols);
            generation = 0;
            updateGenerationDisplay();
            drawGrid();
        }

        function updateGenerationDisplay() {
            generationCountElement.textContent = generation;
        }

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 繪製細胞
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    ctx.fillStyle = grid[row][col] === 1 ? "#000000" : "#FFFFFF";
                    ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
                }
            }

            // 繪製網格線
            ctx.strokeStyle = "#CCCCCC";
            ctx.lineWidth = 1;
            for (let i = 0; i <= rows; i++) {
                ctx.beginPath();
                ctx.moveTo(0, i * cellSize);
                ctx.lineTo(canvas.width, i * cellSize);
                ctx.stroke();
            }
            for (let i = 0; i <= cols; i++) {
                ctx.beginPath();
                ctx.moveTo(i * cellSize, 0);
                ctx.lineTo(i * cellSize, canvas.height);
                ctx.stroke();
            }
        }

        function getNextGeneration() {
            const nextGrid = createGrid(rows, cols);
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const neighbors = countNeighbors(row, col);
                    const currentCell = grid[row][col];
                    
                    if (currentCell === 1) {
                        // 存活規則
                        nextGrid[row][col] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                    } else {
                        // 誕生規則
                        nextGrid[row][col] = neighbors === 3 ? 1 : 0;
                    }
                }
            }
            
            return nextGrid;
        }

        function countNeighbors(row, col) {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    
                    const newRow = row + i;
                    const newCol = col + j;
                    
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        count += grid[newRow][newCol];
                    }
                }
            }
            return count;
        }

        function update() {
            grid = getNextGeneration();
            generation++;
            updateGenerationDisplay();
            drawGrid();
        }

        function startGame() {
            if (!intervalId) {
                intervalId = setInterval(update, simulationSpeed);
                startBtn.disabled = true;
                stopBtn.disabled = false;
            }
        }

        function stopGame() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
                startBtn.disabled = false;
                stopBtn.disabled = true;
                stepBtn.disabled = false;
            }
        }

        // 事件監聽器
        canvas.addEventListener("click", function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);
            
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
                grid[row][col] = grid[row][col] === 1 ? 0 : 1;
                drawGrid();
            }
        });

        startBtn.addEventListener("click", startGame);
        stopBtn.addEventListener("click", stopGame);
        stepBtn.addEventListener("click", update);  // 單步更新
        randomBtn.addEventListener("click", randomizeGrid);
        clearBtn.addEventListener("click", clearGrid);

        // 初始設置
        stopBtn.disabled = true;
        drawGrid();