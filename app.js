const express = require('express');
const app = express();
const port = 4000;

// 在伺服器啟動時執行
function calcBmi(){
  var weight = parseInt(document.gerElemenById("weight"));
  var height = parseInt(document.gerElemenById("height"));
  var bmi = weight / ((height / 100) ** 2);
  console.log("Your BMI is " + bmi);
}
// 設置根路徑的 GET 請求
app.get('/', (req, res) => {
  res.send(`Hello, welcome to your Node.js server! Your BMI is ${bmi.toFixed(2)}`);
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
