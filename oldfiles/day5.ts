import * as fs from "fs";
var file = fs.readFileSync('day5.txt', 'utf8').split('\r\n');

var ship = file.slice(0,8);
var instructions = file.slice(10);
var stacks = {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': []};
var test = instructions.slice(0,1);


/**
    [B]             [B] [S]        
    [M]             [P] [L] [B] [J]
    [D]     [R]     [V] [D] [Q] [D]
    [T] [R] [Z]     [H] [H] [G] [C]
    [P] [W] [J] [B] [J] [F] [J] [S]
[N] [S] [Z] [V] [M] [N] [Z] [F] [M]
[W] [Z] [H] [D] [H] [G] [Q] [S] [W]
[B] [L] [Q] [W] [S] [L] [J] [W] [Z]
 1   2   3   4   5   6   7   8   9 

move 3 from 5 to 2
move 5 from 3 to 1
move 4 from 4 to 9
 */

/** */

function init_stack(){
    for (let i = ship.length-1; i>=0; i--) {
        let insert_at_row = 1;
        let row = ship[i];
        for (let cursor = 1; cursor < row.length; cursor += 4) {
            let char = row.charAt(cursor);
            if (char != ' ') {
                stacks[`${insert_at_row}`].push(char);
            }
            insert_at_row++;
        }
        insert_at_row = 1;
    }
}

function do_instruction(move: number, from: string|number, to: string|number){
    for(let i = 0;i < move; i++){
        let pop = stacks[`${from}`].pop();
        if(!(pop=='undefined' || pop==undefined) == true){
            stacks[`${to}`].push(pop);
        }
    }
}

function do_multi_move(move: number, from: string|number, to: string|number){
    var tmpstack: string[] = [];
    for(let i = 0;i < move; i++){
        let pop = stacks[`${from}`].pop();
        tmpstack.push(pop);
    }
    for(let i = 0;i < move; i++){
        let shift = tmpstack.pop();
        stacks[`${to}`].push(shift);
    }
}

function part1(ship: string[], instructions: string[]){
    
    // Parse ships into stacks
    init_stack();
    
    for(const inst of instructions){
        let matches = inst.match(/move (\d+) from (\d) to (\d)/);
        do_instruction(parseInt(matches[1]), matches[2], matches[3]);
    }

    var output = '';
    for(let i = 1;i<10;i++){
        let char = stacks[`${i}`].pop();
        output+=char;
    }
    console.log(output);
}

function part2(ship: string[], instructions: string[]){
    init_stack();
    console.log(test);
    for(const inst of instructions){
        let matches = inst.match(/move (\d+) from (\d) to (\d)/);
        do_multi_move(parseInt(matches[1]), matches[2], matches[3]);
    }

    var output = '';
    for(let i = 1;i<10;i++){
        let char = stacks[`${i}`].pop();
        output+=char;
    }
    console.log(output);

}

//part1(ship, instructions);
part2(ship, instructions);
