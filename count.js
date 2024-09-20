function calcbmi(){
    var weight = Number(document.getElemenById("weight").value);
    var height = Number(document.getElemenById("height").value);
    var bmi = weight / ((height / 100) ** 2);
    document.getElemenById("bmi").innerHTML=bmi;
    console.log("Your BMI is " + bmi);
  }