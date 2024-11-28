function bracketMatch(inputString){

    var opening=[];

    var isMatched = true;
    // var i = 0;
    var symbol = inputString.charAt(i=0);

    while(isMatched && i < inputString.length){
        if(symbol == '{' || symbol == '(' || symbol == '['){
            opening.push(symbol);
        }
        if(symbol == '}' || symbol == ')' ||symbol == "]"){
            if(opening.length == 0){
                isMatched = false;
            }
            else{
                var match = opening.pop();
                isMatched = (symbol == '}' && match == '{') || 
                (symbol ==')'&& match =='(') ||
                (symbol == "]"&& match == '[');
            }
        }
        symbol = inputString.charAt(++i);

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


