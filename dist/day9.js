"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync('day9.txt', 'utf8').split('\r\n');
var test1 = "R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20";
var test2 = "R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20";
/*
var matrix_height = 300;
var matrix_width = 250;
var m_start_r = 100;
var m_start_c = 200;
*/
var matrix_height = 1000;
var matrix_width = 1000;
var m_start_r = Math.floor(matrix_height / 2);
var m_start_c = Math.floor(matrix_width / 2);
var matrix = load_matrix();
function load_matrix() {
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
    matrix[m_start_r][m_start_c] = 'X'; // Set start position
    return matrix;
}
function clear_matrix() {
    for (var row = 0; row < matrix_height; row++) {
        //Row
        for (var col = 0; col < matrix_width; col++) {
            //Column
            matrix[row][col] = '.';
        }
    }
    matrix[m_start_r][m_start_c] = 'X'; // Set start position
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
function debug_move_head(head, tail, dir) {
    if (dir.direction == 'U') {
        for (var i = 0; i < dir.moves; i++) {
            head.row -= 1;
            matrix[head.row][head.col] = 'H';
            var diff = head.row - tail.row;
            if (diff <= -2) {
                matrix[tail.row][tail.col] = 'X';
                if (tail.col != head.col) {
                    tail.col = head.col;
                }
                tail.row -= 1;
                matrix[tail.row][tail.col] = 'T';
            }
        }
    }
    if (dir.direction == 'D') {
        for (var i = 0; i < dir.moves; i++) {
            head.row += 1;
            matrix[head.row][head.col] = 'H';
            var diff = head.row - tail.row;
            if (diff >= 2) {
                matrix[tail.row][tail.col] = 'X';
                if (tail.col != head.col) {
                    tail.col = head.col;
                }
                tail.row += 1;
                matrix[tail.row][tail.col] = 'T';
            }
        }
    }
    if (dir.direction == 'R') {
        for (var i = 0; i < dir.moves; i++) {
            head.col += 1;
            matrix[head.row][head.col] = 'H';
            var diff = head.col - tail.col;
            if (diff >= 2) {
                matrix[tail.row][tail.col] = 'X';
                if (tail.row != head.row) {
                    tail.row = head.row;
                }
                tail.col += 1;
                matrix[tail.row][tail.col] = 'T';
            }
        }
    }
    if (dir.direction == 'L') {
        for (var i = 0; i < dir.moves; i++) {
            head.col -= 1;
            matrix[head.row][head.col] = 'H';
            var diff = head.col - tail.col;
            if (diff <= -2) {
                matrix[tail.row][tail.col] = 'X';
                if (tail.row != head.row) {
                    tail.row = head.row;
                }
                tail.col -= 1;
                matrix[tail.row][tail.col] = 'T';
            }
        }
    }
    return [head, tail];
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
                //console.log(`T row ${tail.row} col ${tail.col}`);
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
                //console.log(`T row ${tail.row} col ${tail.col}`);
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
                //console.log(`T row ${tail.row} col ${tail.col}`);
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
                //console.log(`T row ${tail.row} col ${tail.col}`);
                matrix[tail.row][tail.col] = 'X';
            }
        }
    }
    return [head, tail];
}
function in_range(f_agent, b_agent) {
    var rowdiff = f_agent.row - b_agent.row;
    if (rowdiff >= 2 || rowdiff <= -2) {
        return false;
    }
    var colldiff = f_agent.col - b_agent.col;
    if (colldiff >= 2 || colldiff <= -2) {
        return false;
    }
    return true;
}
function move_rope(agents, dir) {
    var tail_idx = agents.length - 1;
    if (dir.direction == 'U') {
        for (var d = 0; d < dir.moves; d++) {
            // Move head. 
            agents[0].row -= 1;
            for (var a_idx = 0; a_idx < agents.length - 1; a_idx++) {
                var front = agents[a_idx];
                var back = agents[a_idx + 1];
                // If back is out of range of front, then move back.
                if (!in_range(front, back)) {
                    // If not same col, then move diagonally
                    if (front.row != back.row) {
                        var diff = (front.row > back.row) ? 1 : -1;
                        back.row += diff;
                    }
                    if (front.col != back.col) {
                        var diff = (front.col > back.col) ? 1 : -1;
                        back.col += diff;
                    }
                    if (a_idx + 1 == tail_idx) {
                        matrix[back.row][back.col] = 'X';
                    }
                }
            }
        }
    }
    if (dir.direction == 'D') {
        for (var d = 0; d < dir.moves; d++) {
            // Move head. 
            agents[0].row += 1;
            for (var a_idx = 0; a_idx < agents.length - 1; a_idx++) {
                var front = agents[a_idx];
                var back = agents[a_idx + 1];
                // If back is out of range of front, then move back.
                if (!in_range(front, back)) {
                    // If not same col, then move diagonally
                    if (front.row != back.row) {
                        var diff = (front.row > back.row) ? 1 : -1;
                        back.row += diff;
                    }
                    if (front.col != back.col) {
                        var diff = (front.col > back.col) ? 1 : -1;
                        back.col += diff;
                    }
                    if (a_idx + 1 == tail_idx) {
                        matrix[back.row][back.col] = 'X';
                    }
                }
            }
        }
    }
    if (dir.direction == 'R') {
        for (var d = 0; d < dir.moves; d++) {
            agents[0].col += 1;
            for (var a_idx = 0; a_idx < agents.length - 1; a_idx++) {
                var front = agents[a_idx];
                var back = agents[a_idx + 1];
                // If back is out of range of front, then move back.
                if (!in_range(front, back)) {
                    // If not same row, then move diagonally
                    if (front.row != back.row) {
                        var diff = (front.row > back.row) ? 1 : -1;
                        back.row += diff;
                    }
                    if (front.col != back.col) {
                        var diff = (front.col > back.col) ? 1 : -1;
                        back.col += diff;
                    }
                    if (a_idx + 1 == tail_idx) {
                        matrix[back.row][back.col] = 'X';
                    }
                }
            }
        }
    }
    if (dir.direction == 'L') {
        for (var i = 0; i < dir.moves; i++) {
            agents[0].col -= 1;
            for (var a_idx = 0; a_idx < agents.length - 1; a_idx++) {
                var front = agents[a_idx];
                var back = agents[a_idx + 1];
                // If back is out of range of front, then move back.
                if (!in_range(front, back)) {
                    // If not same row, then move diagonally
                    if (front.row != back.row) {
                        var diff = (front.row > back.row) ? 1 : -1;
                        back.row += diff;
                    }
                    if (front.col != back.col) {
                        var diff = (front.col > back.col) ? 1 : -1;
                        back.col += diff;
                    }
                    if (a_idx + 1 == tail_idx) {
                        matrix[back.row][back.col] = 'X';
                    }
                }
            }
        }
    }
    return agents;
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
function write_positions(agents) {
    //clear_matrix();
    matrix[m_start_r][m_start_c] = 's';
    for (var i = agents.length - 1; i >= 0; i--) {
        var agent = agents[i];
        if (i == 0) {
            matrix[agent.row][agent.col] = 'H';
        }
        else {
            matrix[agent.row][agent.col] = i.toString();
        }
    }
}
function part1() {
    var _a;
    clear_matrix();
    var dirs = get_directions(input);
    clear_log();
    var tail = { row: m_start_r, col: m_start_c };
    var head = { row: m_start_r, col: m_start_c };
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var d = dirs_1[_i];
        _a = move_head(head, tail, d), head = _a[0], tail = _a[1];
    }
    console.log("Tail visited : " + count_visited());
}
function part2() {
    clear_matrix();
    var dirs = get_directions(input);
    clear_log();
    var agents = [];
    for (var a = 0; a < 10; a++) {
        agents.push({ row: m_start_r, col: m_start_c });
    }
    // Init start position
    //let tailidx = agents.length-1;
    for (var _i = 0, dirs_2 = dirs; _i < dirs_2.length; _i++) {
        var d = dirs_2[_i];
        agents = move_rope(agents, d);
    }
    //print_matrix(matrix);
    console.log("Tail visited : " + count_visited());
    write_positions(agents);
    print_matrix(matrix);
}
// Number of positions visited
part1();
part2();
