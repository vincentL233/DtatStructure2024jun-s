var readline = require("readline-sync");
//384401000

let n = readline.questionInt('Please input an intger')
/**
function fab(n) {
    if (n <= 1) {
        return 1;
    } else {
        return fab(n-1) + fab(n-2);
    }
} **/

function fab(n) {
    if (n <= 1) return 1;
    
    let prev = 1;  // 第一個數
    let curr = 1;  // 第二個數
    
    // 從第3個數開始計算，直到第n個數
    for (let i = 2; i <= n; i++) {
        let temp = curr;      // 暫存當前數
        curr = prev + curr;   // 計算下一個數
        prev = temp;          // 更新前一個數
    }
    
    return curr;
}

let count = 0;
let result = 0;

while (result <= n) {
    count++;
    result = fab(count);
}

console.log(`第 ${count} 数 ${result} 超过了 ${n}`);

