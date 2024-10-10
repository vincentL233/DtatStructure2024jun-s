var readline =require("readline-sync");

var ans = [0,1,2,3,4,5,6,7,8,9];//permuttation//
for(var i = 0; i<4; i++){
    var random_number =Math.floor(Math.random()*10);
    var temp = ans[i];
    ans[i] = ans[random_number];
    ans[random_number]=temp;
};
var secret = ans.slice(0,4).join("");

function getAB(secret,guess){
    var A = 0;
    var B = 0;
    for(var i = 0; i<4;i++){
        if(secret[i] === guess[i]){
            A++;
        } else if (secret.includes(guess[i])){
            B++;
        }
    }
    return{A,B};
}

var attempts = 0;
var G;

do{
     G = readline.question("請輸入一個 4 位數的數字: ")
    if(G.length !== 4 || isNaN(G)){
        console.log("無效的輸入。請輸入正好 4 位數。");
        continue;
    }
    attempts++;
    var {A,B} = getAB(secret,G);
    console.log(A + "A" + B + "B");
    if(A === 4){
        console.log("恭喜你！正確答案是" + secret +",你總共猜了"+ attempts +"次。");
        break;
    }
}

while(true);
