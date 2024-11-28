var ary2d =[[1,2,3],[4,5,6],[7,8,9]];
var ans =[0,1,2,3,4,5,6,7,8,9];
//get index at ans:ans[0]//
//get 6 in array?//

//取第二排中第三個值
//art2d[1][2];


//第二排加個Ｎ
//ary2d[1].push("N");
//在最後面加個Ｎ
//ary2d.push("N");
var newary =['NNNN','YYYY'];

ary2d.push(newary);
console.log(ary2d);
//row 排,col 列
var row = 3,col =3; 
var Dayary =[];
value = 0;
for(var _row = 0;_row<row;_row++){
    Dayary.push([]);
    for(var _col = 0;_col<col;_col++){
        Dayary[_row].push(value);
        value++
    }
}
console.log(Dayary)