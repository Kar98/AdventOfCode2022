import * as fs from "fs";
var input = fs.readFileSync('day10.txt', 'utf8').split('\r\n');

var test1 = `noop
addx 3
addx -5`;
var test2 = fs.readFileSync('day10test.txt', 'utf8').split('\r\n');

function test(){
    let arr = [20,40,60];
    if(arr.includes(20)){
        console.log('found 20');
    }
}

class ElfProgram{
    cycle: number;
    X: number;
    register: {};
    print_cycles: number[];
    screen: string[][];

    screen_rows: number;
    screen_cols: number;

    char_counter = 0;
    row_counter = 0;

    constructor(){
        this.cycle = 1;
        this.X = 1;
        this.register = {};
        this.screen_rows = 6;
        this.screen_cols = 40;
        this.print_cycles = [20,60,100,140,180,220];
        this.load_screen();
    }

    load_screen(){
        this.screen = new Array(this.screen_rows);
        for(let i = 0;i < this.screen.length;i++){
            this.screen[i] = new Array(this.screen_cols);
        }
        // Load Each row, into its array
        for(let row = 0;row < this.screen_rows;row++){
            //Row
            for(let col = 0;col < this.screen_cols;col++){
                //Column
                this.screen[row][col] = ' ';
            }
        }
    }

    dump_screen(){
        let output = '';
        for(let row = 0;row < this.screen_rows;row++){
            //Row
            for(let col = 0;col < this.screen_cols;col++){
                //Column
                output += this.screen[row][col];
            }
            output+='\n';
        }
        console.log(output);
    }

    run(instruction: string){
        if(instruction == 'noop'){
            this.noop();
        }else{
            let split = instruction.split(' ');
            this.addx(parseInt(split[1]));
        }
        //console.log(`X : ${this.X} cycle : ${this.cycle}`);
    }

    noop(){
        this.increment_cycle();
    }

    addx(value: number){
        this.increment_cycle();
        this.X += value;
        this.increment_cycle();
        
    }

    write_pixel(){
        let sprite_pos = this.X;
        // The cycle is the char position to write to . 
        // Find what row we need to write to .
        if(this.char_counter == 40){
            this.row_counter++;
            this.char_counter = 0;
        }
        let row = this.row_counter;
        // Find out what col to write to 
        let col = this.cycle - (40*row);
        if(col == -1){
            console.log();
        }
        // Find which character to write
        let char = (sprite_pos-1 == col || sprite_pos == col || sprite_pos+1 == col) ? '#' : '.';
        // Write char to screen
        try{
            this.screen[row][col] = char;
        }catch{
            console.log(`Failed to write at [${row}][${col}]`);
        }
        this.char_counter++;
        
    }

    increment_cycle(){
        this.write_pixel();
        this.cycle++;
        if(this.print_cycles.includes(this.cycle)){
            //console.log(`X : ${this.X} cycle : ${this.cycle}`);
            this.register[this.cycle] = this.cycle * this.X;
        }
    }

    print_sum(){
        let sum = 0;
        for(let reg in this.register){
            sum+=this.register[reg];
        }
        console.log(`Sum of cycles : ${sum}`);
    }
}

function part1(set){
    var program = new ElfProgram();
    for(const instruction of set){
        program.run(instruction);
    }
    program.print_sum();
}

function part2(set){
    var program = new ElfProgram();
    for(const instruction of set){
        program.run(instruction);
    }
    program.dump_screen();
}

part1(input);
part2(input);
//test();