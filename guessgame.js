var readline = require("readline-sync");
var Ans = Math.floor(Math.random()*9)+1;//0 <= 1
var win =false
while(!win){
    do{
        var G = readline.questionInt("Please input an intger 0 ~ 9 : ");
    }while(G<0 || G>9)
    
    if(Ans == G){
        console.log("you win!");

        var again = readline.question("Agnin? Y/N ");
        if(again =="Y"){
            Ans = Math.floor(Math.random()*9)+1;
        }else{
            win = true;
        }
    }else{
        console.log("you Worng");
    }
}

