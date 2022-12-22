import * as fs from "fs";
var input = fs.readFileSync('day11.txt', 'utf8').split('\r\n');
var modulo = 1;
interface Action{
    monkey_to_throw_to: number,
    item_value: number
}

class Monkey{
    index: number;
    items: number[];
    operation: Function;
    test: number;
    true_monkey: number;
    false_monkey: number;
    items_inspected: number;

    constructor(index: number, items: number[], operation: Function, test: number, truem: number, falsem: number){
        this.index = index;
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.true_monkey = truem;
        this.false_monkey = falsem;
        this.items_inspected = 0;

    }

    inspect_part1(){
        let actions: Action[] = [];
        for(let item_idx = 0; item_idx < this.items.length;item_idx++){
            this.items[item_idx] = this.operation(this.items[item_idx]);
            this.items[item_idx] = Math.floor(this.items[item_idx] / 3);
            let to_monkey = (this.items[item_idx] % this.test == 0) ? this.true_monkey : this.false_monkey;
            actions.push({monkey_to_throw_to: to_monkey, item_value: this.items[item_idx]});
            this.items_inspected++;
        }
        this.items = [];
        return actions;
    }

    inspect_part2(){
        let actions: Action[] = [];
        for(let item_idx = 0; item_idx < this.items.length;item_idx++){
            let item = this.items[item_idx];
            let value = this.operation(item) % modulo;
            let to_monkey = (value % this.test == 0) ? this.true_monkey : this.false_monkey;
            actions.push({monkey_to_throw_to: to_monkey, item_value: item});
            this.items_inspected++;
        }
        this.items = [];
        return actions;
    }

}

function print_items_inspected(monkeys: Monkey[]){
    for(let i = 0; i < monkeys.length; i++){
        console.log(`Monkey ${i} inspected items ${monkeys[i].items_inspected} times`);
    }
}

function setup_test_monkeys(){
    let monkeys: Monkey[] = [];
    monkeys.push(new Monkey(0,[79,98],function(i){return i*19},23,2,3));
    monkeys.push(new Monkey(1,[56,65,75,74],function(i){return i+6},19,2,0));
    monkeys.push(new Monkey(2,[79,60,97],function(i){return i*i},13,1,3));
    monkeys.push(new Monkey(3,[74],function(i){return i+3},17,0,1));
    return monkeys;
}

function setup_monkeys(){
    let monkeys: Monkey[] = [];
    monkeys.push(new Monkey(0,[83,97,95,67],function(i){return i*19},17,2,7));
    monkeys.push(new Monkey(1,[71,70,79,88,56,70],function(i){return i+2},19,7,0));
    monkeys.push(new Monkey(2,[98,51,51,63,80,85,84,95],function(i){return i+7},7,4,3));
    monkeys.push(new Monkey(3,[77,90,82,80,79],function(i){return i+1},11,6,4));
    monkeys.push(new Monkey(4,[68],function(i){return i*5},13,6,5));
    monkeys.push(new Monkey(5,[60,94],function(i){return i+5},3,1,0));
    monkeys.push(new Monkey(6,[81,51,85],function(i){return i*i},5,5,1));
    monkeys.push(new Monkey(7,[98,81,63,65,84,71,84],function(i){return i+3},2,2,3));
    return monkeys;
}

function do_actions(monkey_list: Monkey[], actions: Action[]){
    for(let action of actions){
        monkey_list[action.monkey_to_throw_to].items.push(action.item_value);
    }
}

function part1(){
    let monkeys = setup_monkeys();
    let rounds = 20;

    // Each monkey takes turns inspecting all the items. Done in order from 0 to nth.
    // Monkey inspects, after it inspects, then current worry level / 3, then Math.floor()
    // Check worry level, then throw to other monkey
    for(let r = 1;r < rounds+1;r++){
        for(let m_idx = 0; m_idx < monkeys.length; m_idx++){
            let current_monkey = monkeys[m_idx];
            let actions = current_monkey.inspect_part1();
            do_actions(monkeys, actions);
        }
        console.log(`Round ${r} done`);
        /*console.log(`Monkey ${monkeys[0].index} items : ${monkeys[0].items}`);
        console.log(`Monkey ${monkeys[1].index} items : ${monkeys[1].items}`);
        console.log(`Monkey ${monkeys[2].index} items : ${monkeys[2].items}`);
        console.log(`Monkey ${monkeys[3].index} items : ${monkeys[3].items}`);*/
    }
    let inspected = [];
    for(let i = 0; i < monkeys.length; i ++){
        inspected.push(monkeys[i].items_inspected);
    }
    console.log(`Total monkeys : ${monkeys.length}`);
    inspected = inspected.sort(function(a,b){return b - a});
    console.log(`First monkey = ${inspected[0]} . Second monkey = ${inspected[1]}`);
    console.log(`Monkey business = ${inspected[0] * inspected[1]}`);
}

function part2(){
    let monkeys = setup_test_monkeys();
    let rounds = 1000;
    modulo = monkeys.reduce((a, b) => a * b.test, 1);

    for(let r = 1;r < rounds+1;r++){
        for(let m_idx = 0; m_idx < monkeys.length; m_idx++){
            let current_monkey = monkeys[m_idx];
            let actions = current_monkey.inspect_part2();
            do_actions(monkeys, actions);
        }
        console.log(`Monkey[0] worry level ${monkeys[0].items}`);
        console.log(`Round ${r} done`);
    }
    let inspected = [];
    for(let i = 0; i < monkeys.length; i ++){
        inspected.push(monkeys[i].items_inspected);
    }
    
    
    print_items_inspected(monkeys);
}

//part1();

part2();