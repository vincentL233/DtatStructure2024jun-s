
var ary2d = [
    [1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 0, 1, 0, 0]
];

// 取得行數和列數
var row = ary2d.length;
var col = ary2d[0].length;

var canvasElement = document.getElementById("map");
var canvas = canvasElement.getContext("2d");

// 計算每個方格的寬度和高度，確保方格能填滿 canvas
var size = Math.min(canvasElement.height / row, canvasElement.width / col);

canvas.strokeStyle = "#000000"; // 設定邊框顏色

for (var _row = 0; _row < row; _row++) {
    for (var _col = 0; _col < col; _col++) {
        // 設定填充顏色
        if (ary2d[_row][_col] == 1) {
            canvas.fillStyle = "#FFFFFF"; // 白色
        } else {
            canvas.fillStyle = "#000000"; // 黑色
        }
        // 使用計算出的 size 來繪製每個方格
        canvas.fillRect(_col * size, _row * size, size, size); // 填滿方格
        canvas.strokeRect(_col * size, _row * size, size, size); // 描邊
    }
}
