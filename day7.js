"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync('day7.txt', 'utf8').split('\r\n');
var test1 = input.slice(0, 39);
var newval = { '/blgtdv/bjlcfcfq/pwcvj/bjp/drsgv/': 'test' };
console.log(newval);
function go_up(path) {
    for (var i = path.length - 2; i >= 0; i--) {
        if (path.charAt(i) == '/') {
            var val = path.slice(0, i + 1);
            return val;
        }
    }
    return '/';
}
function parse(data) {
    var linenum = 0;
    var path = '';
    var files = { '/': [] };
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var line = data_1[_i];
        linenum++;
        if (line.at(0) == '$') {
            // User command
            if (line.includes('$ cd')) {
                var dir = (line.split('$ cd '))[1];
                if (dir == '..') {
                    // go up
                    path = go_up(path);
                }
                else if (dir == '/') {
                    // go to root
                    path = '/';
                }
                else {
                    // go in
                    path += dir + '/';
                }
            }
            else if (line.includes('$ ls')) {
                //
            }
        }
        else {
            // Output
            if (line.startsWith('dir')) {
                var match = line.match(/dir (.*)/);
                var dir = match[1];
                var local = path + dir + '/';
                if (local in files == false) {
                    files[local] = [];
                }
            }
            else {
                try {
                    files[path].push(line);
                }
                catch (_a) {
                    throw new Error('Could not push onto path ' + path);
                }
            }
        }
        console.log(linenum);
    }
    return files;
    console.log('path : ' + path);
    console.log('files : ' + JSON.stringify(files));
}
function build_subdirs(tree) {
    var struct = {};
    for (var k in tree) {
        if (k == '/') {
            // skip
        }
        else {
            struct[k] = [];
            for (var sub in tree) {
                if (sub != k && sub.startsWith(k)) {
                    struct[k].push(sub);
                }
            }
        }
    }
    return struct;
}
function total_filesize(directory, fullset) {
    var size = 0;
    for (var item in fullset) {
        if (item == directory) {
            var files = fullset[item];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var v = files_1[_i];
                var num = (v.split(' '))[0];
                size = size + parseInt(num);
            }
        }
    }
    return size;
}
function part1(data) {
    var final_result = 0;
    var dir_size = {};
    var files = parse(input);
    var subtrees = build_subdirs(files);
    for (var key in subtrees) {
        var size = 0;
        size = total_filesize(key, files);
        for (var _i = 0, _a = subtrees[key]; _i < _a.length; _i++) {
            var dir = _a[_i];
            size += total_filesize(dir, files);
        }
        dir_size[key] = size;
    }
    for (var final_size in dir_size) {
        if (dir_size[final_size] <= 100000) {
            final_result += dir_size[final_size];
        }
    }
    console.log("Result is : ".concat(final_result));
}
function part2(data) {
}
part1(input);
