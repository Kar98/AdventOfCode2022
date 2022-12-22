"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync('day10.txt', 'utf8').split('\r\n');
var test1 = "noop\naddx 3\naddx -5";
var test2 = fs.readFileSync('day10test.txt', 'utf8').split('\r\n');
function test() {
    var arr = [20, 40, 60];
    if (arr.includes(20)) {
        console.log('found 20');
    }
}
var ElfProgram = /** @class */ (function () {
    function ElfProgram() {
        this.char_counter = 0;
        this.row_counter = 0;
        this.cycle = 1;
        this.X = 1;
        this.register = {};
        this.screen_rows = 6;
        this.screen_cols = 40;
        this.print_cycles = [20, 60, 100, 140, 180, 220];
        this.load_screen();
    }
    ElfProgram.prototype.load_screen = function () {
        this.screen = new Array(this.screen_rows);
        for (var i = 0; i < this.screen.length; i++) {
            this.screen[i] = new Array(this.screen_cols);
        }
        // Load Each row, into its array
        for (var row = 0; row < this.screen_rows; row++) {
            //Row
            for (var col = 0; col < this.screen_cols; col++) {
                //Column
                this.screen[row][col] = ' ';
            }
        }
    };
    ElfProgram.prototype.dump_screen = function () {
        var output = '';
        for (var row = 0; row < this.screen_rows; row++) {
            //Row
            for (var col = 0; col < this.screen_cols; col++) {
                //Column
                output += this.screen[row][col];
            }
            output += '\n';
        }
        console.log(output);
    };
    ElfProgram.prototype.run = function (instruction) {
        if (instruction == 'noop') {
            this.noop();
        }
        else {
            var split = instruction.split(' ');
            this.addx(parseInt(split[1]));
        }
        //console.log(`X : ${this.X} cycle : ${this.cycle}`);
    };
    ElfProgram.prototype.noop = function () {
        this.increment_cycle();
    };
    ElfProgram.prototype.addx = function (value) {
        this.increment_cycle();
        this.X += value;
        this.increment_cycle();
    };
    ElfProgram.prototype.write_pixel = function () {
        var sprite_pos = this.X;
        // The cycle is the char position to write to . 
        // Find what row we need to write to .
        if (this.char_counter == 40) {
            this.row_counter++;
            this.char_counter = 0;
        }
        var row = this.row_counter;
        // Find out what col to write to 
        var col = this.cycle - (40 * row);
        if (col == -1) {
            console.log();
        }
        // Find which character to write
        var char = (sprite_pos - 1 == col || sprite_pos == col || sprite_pos + 1 == col) ? '#' : '.';
        // Write char to screen
        try {
            this.screen[row][col] = char;
        }
        catch (_a) {
            console.log("Failed to write at [".concat(row, "][").concat(col, "]"));
        }
        this.char_counter++;
    };
    ElfProgram.prototype.increment_cycle = function () {
        this.write_pixel();
        this.cycle++;
        if (this.print_cycles.includes(this.cycle)) {
            //console.log(`X : ${this.X} cycle : ${this.cycle}`);
            this.register[this.cycle] = this.cycle * this.X;
        }
    };
    ElfProgram.prototype.print_sum = function () {
        var sum = 0;
        for (var reg in this.register) {
            sum += this.register[reg];
        }
        console.log("Sum of cycles : ".concat(sum));
    };
    return ElfProgram;
}());
function part1(set) {
    var program = new ElfProgram();
    for (var _i = 0, set_1 = set; _i < set_1.length; _i++) {
        var instruction = set_1[_i];
        program.run(instruction);
    }
    program.print_sum();
}
function part2(set) {
    var program = new ElfProgram();
    for (var _i = 0, set_2 = set; _i < set_2.length; _i++) {
        var instruction = set_2[_i];
        program.run(instruction);
    }
    program.dump_screen();
}
part1(input);
part2(input);
//test();
