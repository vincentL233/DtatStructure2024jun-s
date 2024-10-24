const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        // 設定尺寸
        const rows = 50;
        const cols = 50;
        const cellSize = canvas.width / cols;

        // 初始化全空狀態的細胞網格
        //創建一個指定行數和列數的空網
        let grid = createGrid(rows, cols);
        let intervalId;

        function createGrid(rows, cols) {
            let arr = new Array(rows);
            for (let i = 0; i < rows; i++) {
                arr[i] = new Array(cols).fill(0);
            }
            return arr;
        }
        //隨機初始化
        function randomizeGrid(grid) {
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    grid[row][col] = Math.random() > 0.7 ? 1 : 0; 
                }
            }
        }

        function drawGrid(grid) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    ctx.fillStyle = grid[row][col] === 1 ? "#000000" : "#FFFFFF";
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }
        //計算下一代的細胞狀態。
        function getNextGeneration(grid) {
            let nextGrid = createGrid(rows, cols);
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const neighbors = countNeighbors(grid, row, col);
                    if (grid[row][col] === 1) {
                        // 活細胞生存條件
                        nextGrid[row][col] = neighbors === 2 || neighbors === 3 ? 1 : 0;
                    } else {
                        // 死細胞復活條件
                        nextGrid[row][col] = neighbors === 3 ? 1 : 0;
                    }
                }
            }
            return nextGrid;
        }
        //計算每個細胞的活鄰居數
        function countNeighbors(grid, row, col) {
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

        //呼叫更新世代
        function update() {
            grid = getNextGeneration(grid);
            drawGrid(grid);
        }
        //每隔 100 毫秒更新一次遊戲狀態
        function startGame() {
            if (!intervalId) {
                intervalId = setInterval(update, 100); 
            }
        }

        // 停止遊戲
        function stopGame() {
            clearInterval(intervalId);
            intervalId = null;
        }

        // 在 canvas 上點擊以切換細胞狀態
        canvas.addEventListener("click", function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);
            grid[row][col] = grid[row][col] === 1 ? 0 : 1;
            drawGrid(grid);
        });

        drawGrid(grid);