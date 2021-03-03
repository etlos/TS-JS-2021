const names = ["Lars", "Peter", "Jan", "Bo"];

//Opgave 2.a
function sortByCharA(n){
    if(n.includes('a')){
        return n;
    }
}
//Filter returns a new array for all elements passing a test/evaluation
function myFilter(array, callback){
    const filterdArray = [];
    for(let i = 0; i < array.length; i++){
        const result = callback(array[i]);
        if(result != null){
        filterdArray.push(result);
        };
    }
    
    return filterdArray;
};
const newArray = myFilter(names, sortByCharA);

console.log('\nOpgave 2.a \nFilter names by char "a": \nUnfiltered: ' + names + '\nFiltered: ' + newArray + '\n')

//Opgave 2.B
//Map runs a function for each element
function myMap(array, callback) {    
    const mappedArray = [];         
    for(let i = 0; i < array.length; i++) {    
        const result = callback(array[i]);        
        if(result != null){
        mappedArray.push(result);
        }    
    }    
    return mappedArray;
}

const newArray2 = myMap(names, sortByCharA);
console.log('\nOpgave 2.b \nArray mapped by char a:')
console.log(newArray2)

//Opgave 3
Array.prototype.myAttachedFilter = function(callback){
    const filterdArray = [];
    for(let i = 0; i < this.length; i++){
        const result = callback(this[i]);
        if(result != null){
        filterdArray.push(result);
        };
    }
    return filterdArray;
};

newArray3 = names.myAttachedFilter(sortByCharA)

console.log('\nOpgave 3: \nMyAttachedFilter method returns:')
console.log(newArray3)

//Opgave 4.a
console.log('\nOpgave 4.a:\n' + names.join(','))
console.log(names.join(' '))
console.log(names.join('#'))

//Opgave 4.b
const numbers = [2, 3, 67, 33];

function sum(accumulator, current){
    return accumulator + current;
}

let result = numbers.reduce(sum)
console.log("\nOpgave 4.b:")
console.log("Sum of all numbers: ")
console.log(result)

//Opgave 4.c
const members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}]

function averageAgeFunc (accumulator, member, index) {
    if (index === members.length - 1) {
        return (accumulator + member.age) / members.length;
    }
    return accumulator + member.age;
}

let averageAge = members.reduce(averageAgeFunc, 0);
console.log("\nOpgave 4.c");
console.log("The average age of the members is: ");
console.log(averageAge);

//Opgave 4.d
const votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];

const votesResult = votes.reduce((votes, v) => {
    if (v in votes) {
      votes[v]++
    }
    else {
      votes[v] = 1
    }
    return votes
  }, {})

console.log('\nOpgave 4.d:')
console.log('The election went like this: ')
console.log(votesResult)

//Opgave 5.b
const makePerson = function(){
    const person = {
        name : '',
        age : ''
    };
    function changeName(p){
        person.name = p
    }
    function changeAge(p){
        person.age = p
    }
    return {
        setName : (p) => {changeName(p);},
        setAge : (p) => {changeAge(p);},
        getValue : () => {return person;}
    }
};
const makePerson1 = makePerson();
const makePerson2 = makePerson();
makePerson1.setName("Hans");
makePerson1.setAge("47");
console.log('\nHi from person1: ')
console.log(makePerson1.getValue())
makePerson2.setName("Tulle")
makePerson2.setAge("17")
console.log('Hi from person2: ')
console.log(makePerson2.getValue())
console.log(makePerson1.getValue().name + ' is making out with ' + makePerson2.getValue().name)