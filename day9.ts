import * as fs from "fs";
var input = fs.readFileSync('day9.txt', 'utf8').split('\r\n');

/*
var testinput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
*/
var test = `R 4\nU 4`;

/*
var matrix_height = 300;
var matrix_width = 250;
var m_start_r = 100;
var m_start_c = 200;
*/
var matrix_height = 15;
var matrix_width = 15;
var m_start_r = Math.floor(matrix_height/2);
var m_start_c = Math.floor(matrix_width/2);
var matrix = load_matrix();

interface Direction{ 
    direction: string,
    moves: number
}

interface Agent{
    row: number,
    col: number
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
function clear_matrix(){
    for(let row = 0;row < matrix_height;row++){
        //Row
        for(let col = 0;col < matrix_width;col++){
            //Column
            matrix[row][col] = '.';
        }
    }
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

function in_range(f_agent: Agent, b_agent: Agent){
    
    let rowdiff = f_agent.row - b_agent.row;
    if(rowdiff >= 2 || rowdiff <= -2){
        return false;
    }
    let colldiff = f_agent.col - b_agent.col;
    if(colldiff >= 2 || colldiff <= -2){
        return false;
    }
    return true;
}

function move_rope(agents: Agent[], dir: Direction){
    if(dir.direction == 'U'){
        for(let i=0;i < dir.moves;i++){
            // Move head. 
            agents[0].row -= 1;
            write_positions(agents);
            for(let a_idx = 0;a_idx < agents.length-1;a_idx++){
                let front = agents[a_idx];
                let back = agents[a_idx+1];
                // If back is out of range of front, then move back.
                if(!in_range(front,back)){
                    // If not same col, then move diagonally
                    if(front.col != back.col){
                        let diff = (front.col > back.col) ? 1 : -1;
                        back.col += diff;
                        back.row -= 1;
                    }
                    else{
                        // Else just move the row
                        back.row -= 1;
                    }
                }
                write_positions(agents);
                if(a_idx == 8){
                    matrix[back.row][back.col] = 'X';
                }
            }
        }
    }
    if(dir.direction == 'D'){
        for(let i=0;i < dir.moves;i++){
            // Move head. 
            agents[0].row -= 1;
            write_positions(agents);
            for(let a_idx = 0;a_idx < agents.length-1;a_idx++){
                let front = agents[a_idx];
                let back = agents[a_idx+1];
                // If back is out of range of front, then move back.
                if(!in_range(front,back)){
                    // If not same col, then move diagonally
                    if(front.col != back.col){
                        let diff = (front.col > back.col) ? 1 : -1;
                        back.col += diff;
                        back.row += 1;
                    }
                    else{
                        // Else just move the row
                        back.row += 1;
                    }
                }
                write_positions(agents);
                if(a_idx == 8){
                    matrix[back.row][back.col] = 'X';
                }
            }
        }
    }
    if(dir.direction == 'R'){
        for(let i=0;i < dir.moves;i++){
            let head = agents[0];
            head.col += 1;
            for(let a_idx = 0;a_idx < agents.length-1;a_idx++){
                let front = agents[a_idx];
                let back = agents[a_idx+1];

                let diff = front.col - back.col;
                if(diff >= 2){
                    if(back.row != front.row){
                        back.row = front.row;
                    }
                    back.col += 1;
                    if(a_idx == 8){
                        matrix[back.row][back.col] = 'X';
                    }
                }
            }
        }
    }
    if(dir.direction == 'L'){
        for(let i=0;i < dir.moves;i++){
            let head = agents[0];
            head.col -= 1;
            for(let a_idx = 0;a_idx < agents.length-1;a_idx++){
                let front = agents[a_idx];
                let back = agents[a_idx+1];

                let diff = front.col - back.col;
                if(diff <= -2){
                    if(back.row != front.row){
                        back.row = front.row;
                    }
                    back.col -= 1;
                    if(a_idx == 8){
                        matrix[back.row][back.col] = 'X';
                    }
                }
            }
        }
    }
    return agents;
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

function write_positions(agents: Agent[]){
    clear_matrix();
    for(let i = 0; i < agents.length; i++){
        let agent = agents[i];
        if(i == 0){
            matrix[agent.row][agent.col] = 'H';
        }else{
            matrix[agent.row][agent.col] = `${i}`;
        }

    }
}


function part1(){
    let dirs = get_directions(input);

    clear_log();
    var tail: Agent = { row: m_start_r, col: m_start_c};
    var head : Agent = { row: m_start_r, col: m_start_c};
    for(const d of dirs){
        [head,tail] = move_head(head, tail, d);
    }
    
    console.log(`Tail visited : ${count_visited()}`);
}

function part2(){
    let dirs = get_directions(test.split('\n'));

    clear_log();
    var agents: Agent[] = [];
    for(let a = 0;a < 10;a++){
        agents.push({row: m_start_r, col: m_start_c});
    }
    
    for(const d of dirs){
        agents = move_rope(agents, d);
    }
    
    write_positions(agents);
    print_matrix(matrix);
    
    console.log(`Tail visited : ${count_visited()}`);
}



// Number of positions visited
//part1();
part2();