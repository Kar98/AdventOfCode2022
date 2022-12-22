import * as fs from "fs";

var data = fs.readFileSync('input.txt', 'utf8').split('\r\n');
console.log(data);

var currentscore = 0;
var elfs: number[] = [];

for(const row of data){
    if(row == ''){
        elfs.push(currentscore);
        currentscore = 0;
    }else{
        currentscore += parseInt(row);
    }
}
elfs.sort();
var len = elfs.length;
console.log(elfs[len-1],elfs[len-2],elfs[len-3]);
console.log(elfs[len-1]+elfs[len-2]+elfs[len-3]);