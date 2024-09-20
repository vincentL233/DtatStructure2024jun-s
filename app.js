var weight =50
var height =150
var bmi =weight/((height/100)**2);
console.log("your bmi is"+bmi)
// 引入 Express
const express = require('express');
const app = express();
const port = 4000; // 伺服器運行的端口

// 設置根路徑的 GET 請求
app.get('/', (req, res) => {
  res.send('Hello, welcome to your Node.js server!');
});

// 啟動伺服器，並監聽指定的端口
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
