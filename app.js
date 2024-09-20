const express = require('express');
const app = express();
const port = 4000;

// 設置根路徑的 GET 請求
app.get('/', (req, res) => {
  res.send(`Hello, welcome to your Node.js server!`);
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
