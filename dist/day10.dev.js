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

var ElfProgram =
/** @class */
function () {
  function ElfProgram() {
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
    } // Load Each row, into its array


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
    } else {
      var split = instruction.split(' ');
      this.addx(parseInt(split[1]));
    } //console.log(`X : ${this.X} cycle : ${this.cycle}`);

  };

  ElfProgram.prototype.noop = function () {
    this.increment_cycle();
  };

  ElfProgram.prototype.addx = function (value) {
    this.increment_cycle();
    this.increment_cycle();
    this.X += value;
  };

  ElfProgram.prototype.write_pixel = function () {
    var sprite_pos = this.X; // The cycle is the char position to write to . 
    // Find what row we need to write to .

    var row = Math.floor(this.cycle / 40);
    var col = this.cycle - 39 * row - 1;

    if (col == -1) {
      console.log();
    } // Find which character to write


    var _char = sprite_pos - 1 == this.cycle || sprite_pos == this.cycle || sprite_pos + 1 == this.cycle ? '#' : '.'; // Write char to screen


    try {
      this.screen[row][col] = _char;
    } catch (_a) {
      console.log("Failed to write at [".concat(row, "][").concat(col, "]"));
    }
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
}();

function part1() {
  var program = new ElfProgram();

  for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
    var instruction = input_1[_i];
    program.run(instruction);
  }

  program.print_sum();
}

function part2() {
  var program = new ElfProgram();

  for (var _i = 0, test2_1 = test2; _i < test2_1.length; _i++) {
    var instruction = test2_1[_i];
    program.run(instruction);
  }

  program.dump_screen();
} //part1();


part2(); //test();