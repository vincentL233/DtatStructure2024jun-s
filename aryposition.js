const readline = require('readline-sync');
var row = 9, col = 9;
var Dayary = [];
for (var _row = 0; _row < row; _row++) {
    Dayary.push([]);
    for (var _col = 0; _col < col; _col++) {
        var random_number = Math.floor(Math.random() * 100);
        Dayary[_row].push(random_number);
    }
}
console.log(Dayary);
function getcoordinate(row, col) {
    if (row >= 0 && row < Dayary.length && col >= 0 && col < Dayary[row].length) {
        return Dayary[row][col];
    } else {
        return "座標超出範圍";
    }
}
while (true) {
    var row = readline.questionInt("請輸入要查詢的行號 (0-8)，或輸入 -1 結束: ");
    if (row === -1) break;

    var col = readline.questionInt("請輸入要查詢的列號 (0-8)，或輸入 -1 結束: ");
    if (col === -1) break;

    var value = getcoordinate(row, col);
    console.log("在 (" + row + ", " + col + ") 的值是: " + value);
}

console.log("查詢結束。");