"use strict";

exports.__esModule = true;

var fs = require("fs");

var input = fs.readFileSync('day8.txt', 'utf8').split('\r\n');
var test1 = input.slice(0, 5);
var matrix_height = 0;
var matrix_width = 0;

function load_matrix(data) {
  // Instantiate the arrays
  matrix_height = data.length;
  var matrix = new Array(matrix_height);
  matrix_width = data[0].length;

  for (var i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(matrix_width);
  } // Load Each row, into its array


  for (var row = 0; row < matrix_height; row++) {
    //Row
    var rowsplits = data[row].split('');

    for (var col = 0; col < matrix_width; col++) {
      //Column
      matrix[row][col] = parseInt(rowsplits[col]);
    }
  }

  return matrix;
}

function check_top(matrix, current) {
  var cur_row = current[0];
  var cur_col = current[1];
  var cur_num = matrix[cur_row][cur_col];

  for (var i = cur_row - 1; i >= 0; i--) {
    if (cur_num <= matrix[i][cur_col]) {
      return false;
    }
  }

  return true;
}

function check_bot(matrix, current) {
  var cur_row = current[0];
  var cur_col = current[1];
  var cur_num = matrix[cur_row][cur_col];

  for (var i = cur_row + 1; i < matrix_height; i++) {
    if (cur_num <= matrix[i][cur_col]) {
      return false;
    }
  }

  return true;
}

function check_right(matrix, current) {}

function check_left(matrix, current) {
  var cur_row = current[0];
  var cur_col = current[1];
  var cur_num = matrix[cur_row][cur_col];

  for (var i = cur_col - 1; i >= 0; i--) {
    if (cur_num <= matrix[cur_row][i]) {
      return false;
    }
  }

  return true;
}

function part1(matrix) {
  for (var row = 1; row < matrix.length; row++) {
    for (var col = 1; col < matrix[row].length; col++) {// If all to the right are > than num
      // If all to the left are > than num
      // If all to the top are > than num
      // If all to the bottom are > than num
    }
  }
}

var matrix = load_matrix(test1); //console.log(check_top(matrix, [3,4]));
//console.log(check_bot(matrix, [3,4]));

console.log(matrix[3][38]);
console.log(check_left(matrix, [3, 38]));