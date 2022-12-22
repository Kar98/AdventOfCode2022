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
    return '/';
}


function parse(data: string[]){
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
    return files;
    console.log('path : '+path);
    console.log('files : '+JSON.stringify(files));
}

function build_subdirs(tree) {
    let struct = {};
    for (var k in tree) {
        if(k == '/'){
            // skip
        }else{
            struct[k] = []
            for(var sub in tree){
                if(sub != k && sub.startsWith(k)){
                    struct[k].push(sub);
                }
            }
        }
    }
    return struct;
}

function total_filesize(directory: string, fullset: {}){
    let size = 0;
    for(const item in fullset){
        if(item == directory){
            let files = fullset[item];
            for(let v of files){
                let num = (v.split(' '))[0];
                size = size + parseInt(num);
            }
        }
    }
    return size;
}
function part1(data){
    let final_result = 0;
    var dir_size = {}
    var files = parse(input);
    var subtrees = build_subdirs(files);
    for(let key in subtrees){
        let size = 0;
        size = total_filesize(key, files);
        for(let dir of subtrees[key]){
            size+=total_filesize(dir, files);
        }
        dir_size[key] = size;
    }

    for(const final_size in dir_size){
        
        if(dir_size[final_size] <= 100000){
            final_result +=dir_size[final_size];
        }
    }
    console.log(`Part1 result is : ${final_result}`);
}

function part2(data){
    let final_result = 9999999999;
    var dir_size = {}
    var files = parse(input);
    var subtrees = build_subdirs(files);
    for(let key in subtrees){
        let size = 0;
        size = total_filesize(key, files);
        for(let dir of subtrees[key]){
            size+=total_filesize(dir, files);
        }
        dir_size[key] = size;
    }

    console.log(JSON.stringify(dir_size));

    for(const final_size in dir_size){
        if(dir_size[final_size] >= 8381165 && dir_size[final_size] < final_result){
            final_result = dir_size[final_size];
        }
    }
    console.log(`Part2 result is : ${final_result}`);
}

//part1(input);
part2(input);