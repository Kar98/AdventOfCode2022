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

function view_top(matrix: number[][], current: number[]){
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

function view_bot(matrix: number[][], current: number[]){
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

function view_right(matrix: number[][], current: number[]){
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

function view_left(matrix: number[][], current: number[]){
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

function count_top(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    let score = 0;
    for(let i = cur_row-1;i >= 0;i--){
        if(cur_num > matrix[i][cur_col]){
            score++;
        }else{
            score++;
            return score;
        }
    }
    return score;
}

function count_bot(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    let score = 0;
    for(let i = cur_row+1;i < matrix_height;i++){
        if(cur_num > matrix[i][cur_col]){
            score++;
        }else{
            score++;
            return score;
        }
    }
    return score;
}

function count_right(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    let score = 0;
    for(let i = cur_col+1;i < matrix_width;i++){
        if(cur_num > matrix[cur_row][i]){
            score++;
        }else{
            score++;
            return score;
        }
    }
    return score;
}

function count_left(matrix: number[][], current: number[]){
    let cur_row = current[0];
    let cur_col = current[1];
    let cur_num = matrix[cur_row][cur_col];
    let score = 0;
    for(let i = cur_col-1;i >= 0;i--){
        if(cur_num > matrix[cur_row][i]){
            score++;
        }else{
            score++;
            return score;
        }
    }
    return score;
}

function check_all(matrix: number[][], current: number[]){
    if(view_top(matrix,current)){
        return true;
    }
    if(view_bot(matrix,current)){
        return true;
    }
    if(view_right(matrix,current)){
        return true;
    }
    if(view_left(matrix,current)){
        return true;
    }
    return false;
}

function calc_score(matrix: number[][], current: number[]){
    let top = count_top(matrix,current);
    let bot = count_bot(matrix,current);
    let right = count_right(matrix,current);
    let left = count_left(matrix,current);
    return top * bot * right * left;
}

function part1(matrix: number[][]){
    let total_clear = 392; // 99 + 97 + 97 + 99 (all the edges of the box)
    for(let row = 1;row < matrix.length-1;row++){
        for(let col = 1;col < matrix[row].length-1;col++){
            if(check_all(matrix, [row,col])){
                total_clear++;
            }
        }
    }
    return total_clear;
}

function part2(matrix: number[][]){
    let best_num = 0;
    for(let row = 1;row < matrix.length-1;row++){
        for(let col = 1;col < matrix[row].length-1;col++){
            let current_score = calc_score(matrix,[row,col]);
            if(current_score > best_num){
                best_num = current_score;
            }
        }
    }
    return best_num;
}

let matrix = load_matrix(input);
let res = part1(matrix);
let res2 = part2(matrix);
console.log(`Total height ${matrix_height} . Total width ${matrix_width}`);
console.log(`Total calced in clear ${res}`);

console.log(`Best score ${res2}`);



