"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync('input.txt', 'utf8').split('\r\n');
console.log(data);
var elf1;
var elf2;
var elf3;
var currentscore = 0;
var elfs = [];
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var row = data_1[_i];
    if (row == '') {
        elfs.push(currentscore);
        currentscore = 0;
    }
    else {
        currentscore += parseInt(row);
    }
}
elfs.sort();
var len = elfs.length;
console.log(elfs[len - 1], elfs[len - 2], elfs[len - 3]);
console.log(elfs[len - 1] + elfs[len - 2] + elfs[len - 3]);
