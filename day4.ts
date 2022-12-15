import * as fs from "fs";
var input = fs.readFileSync('day4.txt', 'utf8').split('\r\n');
var test = input.slice(0,9);
test = ['12-13,13-61'];
class Pair{
    high: number
    low: number
    constructor(l, h){
        this.low = l;
        this.high = h;
    }
}
function part1(data){
    var matches = 0;
    var rowcount = 1;
    for(const row of data){
        let pairs = row.split(',');
        let split = pairs[0].split('-');
        let pair1 = new Pair(parseInt(split[0]),parseInt(split[1]));
        split = pairs[1].split('-');
        let pair2 = new Pair(parseInt(split[0]),parseInt(split[1]));
    
        if(pair1.low <= pair2.low && pair1.high >= pair2.high){
            matches++;
            continue;
            //console.log(`Pair1 within ${pair1.low}-${pair1.high} . Row ${rowcount}`);
        }
        if(pair2.low <= pair1.low && pair2.high >= pair1.high){
            matches++;
            //console.log(`Pair2 within ${pair2.low}-${pair2.high} . Row ${rowcount}`);
        }
        rowcount++;
    }
    return matches;
}

function part2(data){
    var matches = 0;
    var rowcount = 1;
    for(const row of data){
        let pairs = row.split(',');
        let split = pairs[0].split('-');
        let pair1 = new Pair(parseInt(split[0]),parseInt(split[1]));
        split = pairs[1].split('-');
        let pair2 = new Pair(parseInt(split[0]),parseInt(split[1]));
        
        let pair1arr: number[] = [];
        let pair2arr: number[] = [];
        for(let i = 0;i <= pair1.high - pair1.low;i++){
            pair1arr.push(pair1.low+i);
        }
        if(pair1.low == pair1.high){
            pair1arr.push(pair1.low);
        }

        for(let i = 0;i <= pair2.high - pair2.low;i++){
            pair2arr.push(pair2.low+i);
        }
        if(pair2.low == pair2.high){
            pair2arr.push(pair2.low);
        }

        let isinarr = pair1arr.some((a) => {return pair2arr.includes(a)})
        if(isinarr){
            matches++;
            //console.log(`Found at${rowcount}`);
        }
        rowcount++;
    }
    return matches;
}



console.log(`Total matches : ` + part2(input));