import * as fs from "fs";
var input = fs.readFileSync('day9.txt', 'utf8').split('\r\n');
var test: Direction[] = [{direction: 'U', moves: 5},{direction: 'D', moves: 10}];

var matrix_height = 300;
var matrix_width = 250;
var m_start_r = 100;
var m_start_c = 200;
var matrix = load_matrix();

interface Direction{ 
    direction: string,
    moves: number
}

interface Agent{
    row: number,
    col: number,
    visited: number
}

function load_matrix(){
    // Instantiate the arrays
    let matrix = new Array(matrix_height);
    for(let i = 0;i < matrix.length;i++){
        matrix[i] = new Array(matrix_width);
    }
    // Load Each row, into its array
    for(let row = 0;row < matrix_height;row++){
        //Row
        for(let col = 0;col < matrix_width;col++){
            //Column
            matrix[row][col] = '.';
        }
    }
    return matrix;
}

function get_directions(data: string[]){
    var instructions: Direction[] = [];
    for(let row of data){
        let splits = row.split(' ');
        instructions.push({direction: splits[0], moves: parseInt(splits[1])});
    }
    return instructions;
}


function debug_move_head(head: Agent, tail: Agent, dir: Direction){
    if(dir.direction == 'U'){
        for(let i=0;i < dir.moves;i++){
            head.row -= 1;
            matrix[head.row][head.col] = 'H';
            let diff = head.row - tail.row;
            if(diff <= -2){
                matrix[tail.row][tail.col] = 'X';
                if(tail.col != head.col){
                    tail.col = head.col;
                }
                tail.row -= 1;
                matrix[tail.row][tail.col] = 'T';
            }
            
        }
        
    }
    if(dir.direction == 'D'){
        for(let i=0;i < dir.moves;i++){
            head.row += 1;
            matrix[head.row][head.col] = 'H';
            let diff = head.row - tail.row;
            if(diff >= 2){
                matrix[tail.row][tail.col] = 'X';
                if(tail.col != head.col){
                    tail.col = head.col;
                }
                tail.row += 1;
                matrix[tail.row][tail.col] = 'T';
            }
            
        }
    }
    if(dir.direction == 'R'){
        for(let i=0;i < dir.moves;i++){
            head.col += 1;
            matrix[head.row][head.col] = 'H';
            let diff = head.col - tail.col;
            if(diff >= 2){
                matrix[tail.row][tail.col] = 'X';
                if(tail.row != head.row){
                    tail.row = head.row;
                }
                tail.col += 1;
                matrix[tail.row][tail.col] = 'T';
            }
            
        }
    }
    if(dir.direction == 'L'){
        for(let i=0;i < dir.moves;i++){
            head.col -= 1;
            matrix[head.row][head.col] = 'H';
            let diff = head.col - tail.col;
            if(diff <= -2){
                matrix[tail.row][tail.col] = 'X';
                if(tail.row != head.row){
                    tail.row = head.row;
                }
                tail.col -= 1;
                matrix[tail.row][tail.col] = 'T';
            }
            
        }
    }
    return [head,tail];
}


function move_head(head: Agent, tail: Agent, dir: Direction){
    if(head.row>100){
        let tmp = 1;
    }
    if(dir.direction == 'U'){
        for(let i=0;i < dir.moves;i++){
            head.row -= 1;
            let diff = head.row - tail.row;
            if(diff <= -2){
                if(tail.col != head.col){
                    tail.col = head.col;
                }
                tail.row -= 1;
                //console.log(`T row ${tail.row} col ${tail.col}`);
                matrix[tail.row][tail.col] = 'X';
            }
            
        }
        
    }
    if(dir.direction == 'D'){
        for(let i=0;i < dir.moves;i++){
            head.row += 1;
            let diff = head.row - tail.row;
            if(diff >= 2){
                if(tail.col != head.col){
                    tail.col = head.col;
                }
                tail.row += 1;
                //console.log(`T row ${tail.row} col ${tail.col}`);
                matrix[tail.row][tail.col] = 'X';
            }
            
        }
    }
    if(dir.direction == 'R'){
        for(let i=0;i < dir.moves;i++){
            head.col += 1;
            let diff = head.col - tail.col;
            if(diff >= 2){
                if(tail.row != head.row){
                    tail.row = head.row;
                }
                tail.col += 1;
                //console.log(`T row ${tail.row} col ${tail.col}`);
                matrix[tail.row][tail.col] = 'X';
            }
            
        }
    }
    if(dir.direction == 'L'){
        for(let i=0;i < dir.moves;i++){
            head.col -= 1;
            let diff = head.col - tail.col;
            if(diff <= -2){
                if(tail.row != head.row){
                    tail.row = head.row;
                }
                tail.col -= 1;
                //console.log(`T row ${tail.row} col ${tail.col}`);
                matrix[tail.row][tail.col] = 'X';
            }
            
        }
    }
    return [head,tail];
}

function count_visited(){
    let total = 1; // Starting point
    for(let row = 0;row < matrix_height; row++){
        for(let col = 0;col < matrix_width; col++){
            if(matrix[row][col] == 'X'){
                total++;
            }
        }
    }
    return total;
}

function clear_log(){
    fs.writeFileSync('.logs.txt','');
}

function print_matrix(matrix: string[][]){
    var output = '';
    output += `-----------------\n`;
    for(let row = 0;row < matrix.length;row++){
        for(let col = 0;col < matrix[row].length;col++){
            output+=matrix[row][col];
        }
        output +='\n';
    }
    output += `-----------------\n`;
    fs.appendFileSync('.logs.txt',output);
}


function part1(){
    
    
    let dirs = get_directions(input);
    
    let tail_start: Agent = { row: m_start_r, col: m_start_c, visited: 1};
    let head_start: Agent = { row: m_start_r, col: m_start_c, visited: 1};

    print_matrix(matrix);
    clear_log();
    var tail: Agent = { row: m_start_r, col: m_start_c, visited: 1};
    var head : Agent = { row: m_start_r, col: m_start_c, visited: 1};

    /*
    for(let i = 0;i < 100;i++){
        [head,tail] = move_head(head, tail, dirs[i]);
    }
    */
    
    for(const d of dirs){
        [head,tail] = move_head(head, tail, d);
    }
    
    print_matrix(matrix);

    console.log(`Tail visited : ${count_visited()}`);


}

// Number of positions visited
part1();