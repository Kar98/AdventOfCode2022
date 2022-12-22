import * as fs from "fs";

var input = fs.readFileSync('day3.txt', 'utf8').split('\r\n');
var test = input.slice(0,9);
var priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Grab Rucksack ; vGFhvGvvSdfwqhqvmCPnlFPnCNPcCFcWcr
 * Split into compartments
 * Find common items
 * Sum the priority
*/

function calc_score(char: string){
    return priorities.indexOf(char) + 1;
}

function step1(data: string[]){
    let common_denom: string[] = [];
    let score = 0;
    
    for(const row of data){
        let len = row.length;
        let slice = (len)/2;
        let comp1 = row.slice(0,slice);
        let comp2 = row.slice(slice);
        
        for(const char of Array.from(comp1)){
            if(comp2.includes(char)){
                common_denom.push(char);
                break;
            }
        }
    }


    console.log(common_denom);
    for(const denom of common_denom){
        score+= calc_score(denom);
    }
    return score;

}

function step2(data: string[]){
    var common_denom: string[] = [];
    for(let i = 0;i < data.length;i=i+3){
        let rucksack1 = data[i];
        let rucksack2 = data[i+1];
        let rucksack3 = data[i+2];
        
        for(const char of Array.from(rucksack1)){
            if(rucksack2.includes(char) && rucksack3.includes(char)){
                common_denom.push(char);
                break;
            }
        }

        
    }
    console.log(`Total numbers ` + common_denom.length);
    let totalscore = 0;
    for(const denom of common_denom){
        totalscore+=calc_score(denom);
    }
    console.log(common_denom);
    return totalscore;
}


console.log(step2(input));
console.log('done');