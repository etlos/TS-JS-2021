// const fetch = require('node-fetch')
import fetch from "node-fetch"

function messageDelay(msg, delay){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(msg.length === 0){
                reject("No message")
            }
            const upperCased = msg.toUpperCase();
            resolve(upperCased)
        }, delay)
    })
}

const promises = [
    messageDelay("Hi", 1300),
    messageDelay("Hi Class", 700),
    messageDelay("Hello World", 1700),
    messageDelay("Promises are cool", 500),
    messageDelay("JavaScript is so cool", 1000),
]

Promise.any(promises)
.then((upperCased) => console.log(upperCased));

// messageDelay("Hi Class",1000).then(uMsg => console.log(uMsg)).catch(err=>console.log("Ooops"))