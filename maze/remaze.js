const maze = [
            [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
            [0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 1, 1]
        ];

        let isRunning = false;

        class Point {
            constructor(r, c) {
                this.row = r;
                this.col = c;
            }
            
            isEqual(other) {
                return this.row === other.row && this.col === other.col;
            }
        }

        const start = new Point(0, 0);
        const end = new Point(6, 2);

        class MazeSolver {
            constructor(maze, start, end) {
                this.maze = maze;
                this.start = start;
                this.end = end;
                this.visited = Array(maze.length).fill().map(() => Array(maze[0].length).fill(false));
                this.backtrackCount = Array(maze.length).fill().map(() => Array(maze[0].length).fill(0));
                this.stack = [];
                this.stepCount = 0;
            }

            isValidPosition(row, col) {
                return row >= 0 && row < this.maze.length && 
                       col >= 0 && col < this.maze[0].length;
            }

            isValidMove(row, col) {
                return this.isValidPosition(row, col) && 
                       this.maze[row][col] === 0 && 
                       !this.visited[row][col];
            }

            isSpecialCell(cell, className) {
                return (cell.classList.contains('start') && className !== 'visited') || 
                       (cell.classList.contains('end') && className !== 'visited');
            }

            updateCell(row, col, className) {
                const cell = document.getElementById(`cell-${row}-${col}`);
                if (!cell || this.isSpecialCell(cell, className)) return;
                cell.className = `cell ${className}`;
            }

            updateStepCount(count) {
                document.getElementById('stepCount').textContent = count;
            }

            async solve() {
                this.stack = [this.start];
                this.visited[this.start.row][this.start.col] = true;
                this.maze[this.start.row][this.start.col] = 2;
                this.updateCell(this.start.row, this.start.col, 'visited');
                this.updateStepCount(++this.stepCount);
                let currentStep = this.start;
        
                while (this.stack.length > 0 && !currentStep.isEqual(this.end)) {
                    let moved = false;
                    
                    for (const [dr, dc] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
                        const newRow = currentStep.row + dr;
                        const newCol = currentStep.col + dc;
                        
                        if (this.isValidMove(newRow, newCol)) {
                            currentStep = new Point(newRow, newCol);
                            this.updateCell(currentStep.row, currentStep.col, 'visited');
                            this.stack.push(currentStep);
                            this.visited[newRow][newCol] = true;
                            this.maze[newRow][newCol] = 2;
                            console.log(this.printMaze());
                            this.updateStepCount(++this.stepCount);
                            moved = true;
                            break;
                        }
                    }
                    
                    if (!moved) {
                        const current = this.stack.pop();
                        this.backtrackCount[current.row][current.col]++;
                        this.updateCell(current.row, current.col, 
                            this.backtrackCount[current.row][current.col] > 1 ? 'backtrack-deep' : 'backtrack');
                        
                        if (this.stack.length > 0) {
                            currentStep = this.stack[this.stack.length - 1];
                        } else {
                            return false;
                        }
                    }
                    
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
                
                return currentStep.isEqual(this.end);
            }
        
            printMaze() {
                let mazeStr = '';
                for (let i = 0; i < this.maze.length; i++) {
                    for (let j = 0; j < this.maze[i].length; j++) {
                        mazeStr += this.maze[i][j] + ' ';
                    }
                    mazeStr += '\n';
                }
                return mazeStr;
            }
        }

        function initializeMaze() {
            const mazeElement = document.getElementById('maze');
            mazeElement.innerHTML = '';

            for (let i = 0; i < maze.length; i++) {
                const row = document.createElement('div');
                row.className = 'maze-row';
                
                for (let j = 0; j < maze[i].length; j++) {
                    const cell = document.createElement('div');
                    cell.className = getCellClassName(i, j);
                    cell.id = `cell-${i}-${j}`;
                    row.appendChild(cell);
                }
                
                mazeElement.appendChild(row);
            }
        }

        function getCellClassName(i, j) {
            if (i === start.row && j === start.col) return 'cell start';
            if (i === end.row && j === end.col) return 'cell end';
            return `cell ${maze[i][j] === 1 ? 'wall' : 'path'}`;
        }

        async function startMaze() {
            if (isRunning) return;
            
            const button = document.getElementById('startButton');
            button.disabled = true;
            isRunning = true;
            
            try {
                initializeMaze();
                const solver = new MazeSolver(maze, start, end);
                const result = await solver.solve();
                
                if (!result) {
                    alert('找不到路徑！');
                }
            } catch (error) {
                alert(`錯誤：${error.message}`);
            } finally {
                button.disabled = false;
                isRunning = false;
            }
        }

        function resetMaze() {
            if (isRunning) return;
            initializeMaze();
            document.getElementById('stepCount').textContent = '0';
            document.getElementById('startButton').disabled = false;
        }

        initializeMaze();