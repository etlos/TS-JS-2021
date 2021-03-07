/*
function logger(a, b){
    console.log(`Value 1: ${a}, value 2: ${b}`);
   }
   let a = 12, b = "Hello World";
   logger(a, b);
   */


// function logger(a:number, b:string){
//     console.log(`Value 1: ${a}, value 2: ${b}`);
//     }
//     let a = 12, b = "Hello World";
//     logger(a, b);

   
interface IPerson {name:string}
interface IAddress {street: string}
    
function logger(a:IPerson, b:IAddress){
    console.log(`Value 1: ${a.name}, value 2: ${b.street}`);
    }

class Person implements IPerson {
    //private _name : String;
    #name: string
    constructor(name: string) { this.#name = name }
    get name(): string { return this.#name }
    set name(name: string) { this.#name = name }
    toString(): string { return this.#name }
}

class Address implements IAddress {
    //private _name : String;
    _street: string
    constructor(street: string) { this._street = street }
    get street(): string { return this._street }
    set street(street: string) { this._street = street }
    toString(): string { return this._street }
}

let p1 = new Person("Kurt Wonnegut");
let a1 = new Address("Lyngby Hovedgade 23");
logger(p1, a1);