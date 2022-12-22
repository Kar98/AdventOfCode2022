import * as fs from "fs";

var input = fs.readFileSync('input.txt', 'utf8').split('\r\n');
var test = ['C Z','A Y','C Z','B Z','C Y'];

// A = rock 
// B = paper 
// C = Scissors 
function round1(data){
    let score = 0;
    for(const row of data){
        
        let s = row.split(' ');
        let s0 = s[0];
        let s1 = s[1];
        if(s1 == 'X'){
            score += 1;
            if(s0 == 'A'){
                score+=3;
            }
            if(s0 == 'C'){
                score+=6;
            }
        }else if(s1 == 'Y'){
            score += 2;
            if(s0 == 'B'){
                score+=3;
            }
            if(s0 == 'A'){
                score+=6;
            }
        }else if(s1 == 'Z'){
            score += 3;
            if(s0 == 'C'){
                score+=3;
            }
            if(s0 == 'B'){
                score+=6;
            }
        }
        
    }
}

// X = lose
// Y = draw
// Z = win

function round2(data){
    let score = 0;
    for(const row of data){
        let s = row.split(' ');
        let s0 = s[0];
        let s1 = s[1];
        if(s1 == 'X'){
            if(s0 == 'A'){
                // play scis C
                score+=3;
            }else if(s0 == 'B'){
                // play rock A
                score+=1;
            }else if(s0 == 'C'){
                // play paper B
                score+=2
            }
        }
        if(s1 == 'Y'){
            score+=3;
            if(s0 == 'A'){
                // play rock C
                score+=1;
            }else if(s0 == 'B'){
                // play paper A
                score+=2;
            }else if(s0 == 'C'){
                // play sci B
                score+=3;
            }
        }
        if(s1 == 'Z'){
            score+=6;
            if(s0 == 'A'){
                // play paper C
                score+=2;
            }else if(s0 == 'B'){
                // play scis A
                score+=3;
            }else if(s0 == 'C'){
                // play rock B
                score+=1;
            }
        }
    }
    return score;
}

let score = round2(input);
console.log(score);