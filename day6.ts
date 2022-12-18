import * as fs from "fs";
var input = fs.readFileSync('day6.txt', 'utf8');
var test1 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
var test2 = 'nppdvjthqldpwncqszvftbrmjlhg';
var test3 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
var test4 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';

var test5 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
var test6 = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
var test7 = 'nppdvjthqldpwncqszvftbrmjlhg';
var test8 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';

function count_chars(char: string, input: string){
    let chars = input.split('');
    let match = 0;
    for(const c of chars){
        if(char == c){
            match++;
        }
    }
    return match;
}

function part1(data: string){
    let total_chars = 4;
    for(let i = 0;i<data.length;i++){
        let section = data.slice(i,i+4);
        let window = section.split('');
        if(window.every((a) => {return count_chars(a,section) == 1})){
            return total_chars;
        }
        total_chars++;
    }
}

function part2(data: string){
    let total_chars = 14;
    for(let i = 0;i<data.length;i++){
        let section = data.slice(i,i+14);
        let window = section.split('');
        if(window.every((a) => {return count_chars(a,section) == 1})){
            return total_chars;
        }
        total_chars++;
    }
}

//console.log('part1 : '+part1(input));
console.log('part2 : '+part2(input));


