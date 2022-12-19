"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync('day9.txt', 'utf8').split('\r\n');
var test = input.slice(0, 5);
var matrix_height = 350;
var matrix_width = 350;
var m_start_r = 170;
var m_start_c = 170;
var matrix = load_matrix(test);
function load_matrix(data) {
    // Instantiate the arrays
    var matrix = new Array(matrix_height);
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(matrix_width);
    }
    // Load Each row, into its array
    for (var row = 0; row < matrix_height; row++) {
        //Row
        for (var col = 0; col < matrix_width; col++) {
            //Column
            matrix[row][col] = '.';
        }
    }
    return matrix;
}
function get_directions(data) {
    var instructions = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var row = data_1[_i];
        var splits = row.split(' ');
        instructions.push({ direction: splits[0], moves: parseInt(splits[1]) });
    }
    return instructions;
}
function move_head(head, tail, dir) {
    if (dir.direction == 'U') {
        for (var i = 0; i < dir.moves; i++) {
            head.row -= 1;
            var diff = head.row - tail.row;
            if (diff <= -2) {
                if (tail.col != head.col) {
                    tail.col = head.col;
                }
                tail.row -= 1;
                matrix[tail.row][tail.col] = 'X';
            }
        }
    }
    if (dir.direction == 'D') {
        for (var i = 0; i < dir.moves; i++) {
            head.row += 1;
            var diff = head.row - tail.row;
            if (diff >= 2) {
                if (tail.col != head.col) {
                    tail.col = head.col;
                }
                tail.row += 1;
                matrix[tail.row][tail.col] = 'X';
            }
        }
    }
    if (dir.direction == 'R') {
        for (var i = 0; i < dir.moves; i++) {
            head.col += 1;
            var diff = head.col - tail.col;
            if (diff >= 2) {
                if (tail.row != head.row) {
                    tail.row = head.row;
                }
                tail.col += 1;
                matrix[tail.row][tail.col] = 'X';
            }
        }
    }
    if (dir.direction == 'L') {
        for (var i = 0; i < dir.moves; i++) {
            head.col -= 1;
            var diff = head.col - tail.col;
            if (diff <= -2) {
                if (tail.row != head.row) {
                    tail.row = head.row;
                }
                tail.col -= 1;
                matrix[tail.row][tail.col] = 'X';
            }
        }
    }
    return [head, tail];
}
function count_visited() {
    var total = 0;
    for (var row = 0; row < matrix_height; row++) {
        for (var col = 0; col < matrix_width; col++) {
            if (matrix[row][col] == 'X') {
                total++;
            }
        }
    }
    return total;
}
function clear_log() {
    fs.writeFileSync('.logs.txt', '');
}
function print_matrix(matrix) {
    var output = '';
    output += "-----------------\n";
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix[row].length; col++) {
            output += matrix[row][col];
        }
        output += '\n';
    }
    output += "-----------------\n";
    fs.appendFileSync('.logs.txt', output);
}
function part1() {
    var _a;
    var dirs = get_directions(input);
    var tail_start = { row: m_start_r, col: m_start_c, visited: 1 };
    var head_start = { row: m_start_r, col: m_start_c, visited: 1 };
    //matrix[m_start_r][m_start_c] = 'S';
    clear_log();
    var tail = { row: m_start_r, col: m_start_c, visited: 1 };
    var head = { row: m_start_r, col: m_start_c, visited: 1 };
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var d = dirs_1[_i];
        _a = move_head(head, tail, d), head = _a[0], tail = _a[1];
    }
    print_matrix(matrix);
    console.log("Tail visited : ".concat(count_visited()));
}
// Number of positions visited
part1();
