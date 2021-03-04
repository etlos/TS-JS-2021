interface Person{
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hi, " + person.firstName + " " + person.lastName;
}
let user = {firstName : "Jane", lastName : "Hansen"};


console.log(greeter(user));

