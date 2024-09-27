var readline = require("readline-sync");

var weight = readline.question("Please enter your weight(kg)?");
var height =readline.question("Please enter your height(cm)?");
var bmi =weight/((height/100)**2);

console.log("your bmi is" + bmi);