var readline = require("readline-sync");

var weight = readline.questionInt("Please enter your weight(kg)?");
var height =readline.questionInt("Please enter your height(cm)?");
var bmi =weight/((height/100)**2);
var category;

switch (true) {
    case (bmi >= 27):
        category = "obese";
        break;
    case (bmi >= 24):
            category = "overweight";
        break;   
    case (bmi >= 18.5):
        category = "underweight";
        break;
    default:
        category = "too light";
        break;
}

console.log("Your BMI is " + bmi + ", you are " + category + ".");
