import * as fs from "fs";
var input = fs.readFileSync('day8.txt', 'utf8').split('\r\n');
var test1 = input.slice(0,5);

var matrix_height = 0;
var matrix_width = 0;

function load_matrix(data: string[]){
    
    // Instantiate the arrays
    matrix_height = data.length;
    let matrix = new Array(matrix_height);
    matrix_width = data[0].length;
    for(let i = 0;i < matrix.length;i++){
        matrix[i] = new Array(matrix_width);
    }
    // Load Each row, into its array
    for(let row = 0;row < matrix_height;row++){
        //Row
        let rowsplits = data[row].split('');
        for(let col = 0;col < matrix_width;col++){
            //Column
            matrix[row][col] = parseInt(rowsplits[col]);
        }
    }
    return matrix;
}



function check_top(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    for(let i = cur_row-1;i >= 0;i--){
        if(cur_num <= matrix[i][cur_col]){
            return false;
        }
    }
    return true;
}

function check_bot(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    for(let i = cur_row+1;i < matrix_height;i++){
        if(cur_num <= matrix[i][cur_col]){
            return false;
        }
    }
    return true;
}

function check_right(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    for(let i = cur_col+1;i < matrix_width;i++){
        if(cur_num <= matrix[cur_row][i]){
            return false;
        }
    }
    return true;
}

function check_left(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    for(let i = cur_col-1;i >= 0;i--){
        if(cur_num <= matrix[cur_row][i]){
            return false;
        }
    }
    return true;
}

function part1(matrix: number[][]){
    for(let row = 1;row < matrix.length;row++){
        for(let col = 1;col < matrix[row].length;col++){
            // If all to the right are > than num

            // If all to the left are > than num
            // If all to the top are > than num
            // If all to the bottom are > than num
        }
    }
}

let matrix = load_matrix(test1);
//console.log(check_top(matrix, [3,4]));
//console.log(check_bot(matrix, [3,4]));
console.log(matrix[3][48]);
console.log(check_right(matrix, [3,48]));

