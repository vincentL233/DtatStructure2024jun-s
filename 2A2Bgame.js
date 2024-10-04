var readline =require("readline-sync");

var ans = [0,1,2,3,4,5,6,7,8,9];//permuttation//
for(var i = 0; i<4; i++){
    var random_number =Math.floor(Math.random()*10);
    var temp = ans[i];
    ans[i] = ans[random_number];
    ans[random_number]=temp;
};
do{
    var G = readline.questionInt("Please input 4 disgits? ")
}while(Ｇ<1000 || G> 10000);
var gstr = G.toString();
for(){
    for(){
        
    }
}