String.prototype.bm = function() {
    const left = "{[(";
    const right = "}])";
    const opening = [];
    let isMatched = true;
    let i = 0;
    
    // Use 'this' instead of inputString since we're in a String prototype method
    while(isMatched && i < this.length) {
        const symbol = this.charAt(i);
        
        if(left.includes(symbol)) {
            opening.push(symbol);
        }
        else if(right.includes(symbol)) {
            if(opening.length === 0) {
                isMatched = false;
            }
            else {
                const match = opening.pop();
                const symbolIndex = right.indexOf(symbol);
                const matchIndex = left.indexOf(match);
                isMatched = symbolIndex === matchIndex;
            }
        }
        i++;   
    }
    
    return (opening.length === 0 && isMatched) ? 'matched' : 'unmatched';
};

// Test cases
const tests = [
    "{a =(1 + v(b[3+c[4]]))}",  // matched
    "{a =(1 + v(b[3+c[4]]))",   // unmatched
    "((()))",                    // matched
    "((())",                     // unmatched
    "{[]}",                      // matched
    "{[}]"                       // unmatched
];

tests.forEach(test => {
    console.log(`Testing "${test}": ${test.bm()}`);
});