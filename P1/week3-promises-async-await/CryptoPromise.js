const crypto = require('crypto');

function cryptoPromise(size){
return new Promise((resolve, rejects) => {
    crypto.randomBytes(size, function(err, buffer) {
        if(err){
            return rejects(err)
        }
        let secureHex = buffer.toString('hex');
        resolve(secureHex)
    });
})
}
/*
const promises = [
    cryptoPromise(48),
    cryptoPromise(40),
    cryptoPromise(32),
    cryptoPromise(24),
    cryptoPromise(16),
    cryptoPromise(8),
]
const sixRandoms =  Promise.all(promises).then(results => {
    const myObject = {
        title: "6 secure randoms",
        randoms: results
    }
    return myObject;
})
//sixRandoms.then(obj => {console.log(obj)})
*/

const sixRandoms = async (array) => {
    const myObject = {
        title: "6 secure randoms",
        randoms: []
    }
    const cryptArray = []
    array.map(element => {
        cryptArray.push(cryptoPromise(element))
    });   
    return Promise.all(cryptArray);
}

module.exports = sixRandoms;