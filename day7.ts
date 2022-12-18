import * as fs from "fs";
var input = fs.readFileSync('day7.txt', 'utf8').split('\r\n');
var test1 = input.slice(0,39);

var newval = {'/blgtdv/bjlcfcfq/pwcvj/bjp/drsgv/': 'test'};
console.log(newval);

function go_up(path: string){
    for(let i = path.length-2;i>=0;i--){
        if(path.charAt(i) == '/'){
            let val = path.slice(0,i+1);
            return val;
        }
    }
}

function part1(data: string[]){
    let linenum = 0;
    let path = '';
    let files = {'/': []};
    for(const line of data){
        linenum++;
        if(line.at(0) == '$'){
            // User command
            if(line.includes('$ cd')){
                let dir = (line.split('$ cd '))[1];
                if(dir == '..'){
                    // go up
                    path = go_up(path);
                }else if(dir == '/'){
                    // go to root
                    path = '/';
                }else{
                    // go in
                    path += dir+'/';
                }
            }else if (line.includes('$ ls')){
                //
            }
        }else{
            // Output
            if(line.startsWith('dir')){
                let match = line.match(/dir (.*)/);
                let dir = match[1];
                let local = path+dir+'/';
                if(local in files == false){
                    files[local] = [];
                }
            }else{
                try{
                    files[path].push(line);
                }catch{
                    throw new Error('Could not push onto path ' + path);
                }
                
            }
        }
        console.log(linenum);
    }
    
    console.log('path : '+path);
    console.log('files : '+JSON.stringify(files));
}

function part2(data){

}

part1(input);