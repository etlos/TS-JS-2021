var variable = 10;
(()=>{
   console.log(variable);
   var variable = 20;
   console.log(variable);
})();


//Javascript ser ovenstående på følgende måde: 
//Javascript HOISTER variable=20 op til toppen af funktionen
var variable;
variable = 10;
(()=>{
   var variable;
   console.log(variable);   // undefined
   variable = 20;
   console.log(variable);   // 20
})();

//Det giver en hoisting fejl


var variable = 10;
(()=>{
   console.log(variable);   // undefined
   var variable = 20;
   console.log(variable);   // 20
})();

console.log(variable); // 10
var variable = 30;

//JS læser det som: 

var variable;
variable = 10;
(()=>{
   var variable;
   console.log(variable);   // undefined
   variable = 20;
   console.log(variable);   // 20
})();
console.log(variable); // peger på linje 35
variable = 30;


var variable = 10;
(()=>{
   variable_3 = 35; 
   console.log(variable_3); //35
   var variable_3 = 45; //Bliver hoistet
   variable_2 = 15; //undeclared og derfor en del af global scope pga closures.
   console.log(variable);   // 10
})();

console.log(variable_2); // 15, pga closures
console.log(variable_3);
var variable=30;


