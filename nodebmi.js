var readline = require("readline-sync");

var weight = readline.questionInt("Please enter your weight(kg)?");
var height =readline.questionInt("Please enter your height(cm)?");
var bmi =weight/((height/100)**2);


var resultstr =["obese","overweight","underweight","too light"];


switch (true) {
    case (bmi >= 27):
        resultstr = resultstr[0];
        break;
    case (bmi >= 24):
        resultstr = resultstr[1];
        break;   
    case (bmi >= 18.5):
        resultstr = resultstr[2];
        break;
    default:
        resultstr = resultstr[3];
        break;
}

console.log("Your BMI is " + bmi.toFixed(2) + ", you are " + resultstr + ".");
