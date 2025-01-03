// function hanoi(n, p1, p2, p3) {
//     if (n == 1) {
//         console.log(n + "套環從" + p1 + "移到" + p3);
//     } else {
//         hanoi(n-1, p1, p3, p2);  // 將 n-1 個盤子移到輔助柱
//         console.log(n + "套環從" + p1 + "移到" + p3);  // 移動最大的盤子
//         hanoi(n-1, p2, p1, p3);  // 將 n-1 個盤子從輔助柱移到目標柱
//     }
// }
// hanoi(4, "p1", "p2", "p3");


// function hanoi(n, p1, p2, p3) {
    
//     if (n == 1) {
//         console.log(`第${n}個圓盤從 ${p1} 移到 ${p3}`);
//     } else {
  
//         hanoi(n-1, p1, p3, p2);
        
      
//         console.log(`第${n}個圓盤從 ${p1} 移到 ${p3}`);
        
     
//         hanoi(n-1, p2, p1, p3);
//     }
// }

// console.log("開始移動 4 個圓盤：");
// hanoi(4, "柱子1", "柱子2", "柱子3");

function hanoiIterative(n, source, auxiliary, target) {
    // 創建一個堆疊來存儲移動步驟
    const stack = [];
    let moves = [];
    
    // 初始化狀態對象
    stack.push({
        n: n,
        source: source,
        auxiliary: auxiliary,
        target: target,
        state: 'start'
    });
    
    while (stack.length > 0) {
        // 從堆疊頂部取出當前狀態
        let current = stack.pop();
        
        if (current.n === 1) {
            // 基本情況：直接移動圓盤
            moves.push(`第${current.n}個圓盤從 ${current.source} 移到 ${current.target}`);
        } else {
            switch (current.state) {
                case 'start':
                    // 推入第三步：將 n-1 個圓盤從輔助柱移到目標柱
                    stack.push({
                        n: current.n - 1,
                        source: current.auxiliary,
                        auxiliary: current.source,
                        target: current.target,
                        state: 'start'
                    });
                    
                    // 推入第二步：移動第 n 個圓盤
                    stack.push({
                        n: current.n,
                        source: current.source,
                        auxiliary: current.auxiliary,
                        target: current.target,
                        state: 'move'
                    });
                    
                    // 推入第一步：將 n-1 個圓盤從源柱移到輔助柱
                    stack.push({
                        n: current.n - 1,
                        source: current.source,
                        auxiliary: current.target,
                        target: current.auxiliary,
                        state: 'start'
                    });
                    break;
                    
                case 'move':
                    // 移動最大的圓盤
                    moves.push(`第${current.n}個圓盤從 ${current.source} 移到 ${current.target}`);
                    break;
            }
        }
    }
    
    // 輸出所有移動步驟
    return moves;
}

// 測試
console.log("開始移動 4 個圓盤：");
const moves = hanoiIterative(4, "柱子1", "柱子2", "柱子3");
moves.forEach(move => console.log(move));