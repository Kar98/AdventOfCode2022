"use strict";

exports.__esModule = true;

var fs = require("fs");

var input = fs.readFileSync('day9.txt', 'utf8').split('\r\n');
var test = input.slice(0, 5);
var matrix_height = 10;
var matrix_width = 10;
var m_start_r = 4;
var m_start_c = 4;
var matrix = load_matrix(test);

function load_matrix(data) {
  // Instantiate the arrays
  var matrix = new Array(matrix_height);

  for (var i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(matrix_width);
  } // Load Each row, into its array


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
    instructions.push({
      direction: splits[0],
      moves: parseInt(splits[1])
    });
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

  return head;
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
  var dirs = get_directions(test);
  var tail = {
    row: m_start_r,
    col: m_start_c,
    visited: 1
  };
  var head = {
    row: m_start_r,
    col: m_start_c,
    visited: 1
  };
  matrix[m_start_r][m_start_c] = 'S';
  clear_log();
  print_matrix(matrix);
  head = move_head(head, tail, {
    direction: 'R',
    moves: 1
  });
  print_matrix(matrix);
  head = move_head(head, tail, {
    direction: 'D',
    moves: 1
  });
  print_matrix(matrix);
  head = move_head(head, tail, {
    direction: 'L',
    moves: 3
  });
  print_matrix(matrix);
  head = move_head(head, tail, {
    direction: 'U',
    moves: 3
  });
  print_matrix(matrix);
  matrix[head.row][head.col] = '$';
  print_matrix(matrix);
} // Number of positions visited


part1();