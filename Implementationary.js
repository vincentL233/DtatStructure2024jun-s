function bracketMatch(inputString){

    var opening=[];

    var isMatched = true;

    var bracketPairs = {
        '}': '{',
        ']': '[',
        ')': '('
    }
    

    var i =0;
    while(isMatched && i < inputString.length){
        var symbol = inputString.charAt(i);
        if(symbol == '{' || symbol == '(' || symbol == '['){
            opening.push(symbol);
        }
         else if(symbol == '}' || symbol == ')' ||symbol == "]"){
            if(opening.length == 0){
                isMatched = false;
            }
            else{
                var match = opening.pop();
                isMatched = (bracketPairs[symbol] == match);
            }
        }
        i++;
    }
    if(opening.length > 0 || !isMatched){
        return 'unmatched';
    } else { 
        return 'matched'
    } 
}
console.log(bracketMatch("{a = (b[0)+1];"));
console.log(bracketMatch("{}[]")); // matched
console.log(bracketMatch("{[}]")); // unmatched
console.log(bracketMatch("{")); // unmatched
console.log(bracketMatch("}{")); // unmatched
console.log(bracketMatch("{[()]}")); // matched