//Opgave 1.a
const os = require("os");

const platform = os.platform();
const osType = os.type();
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
// const EOL = os.EOL();

/*
console.log(`Platform: ${platform}`);
console.log(`OS Type: ${osType}`);
console.log(`Free memory: ${freeMemory}`);
console.log(`Total memory: ${totalMemory}`);
// console.log(EOL: ${EOL});
*/
const osInfo = {
    platform : platform,
    osType : osType,
    freeMemory : freeMemory,
    totalMemory : totalMemory
}
module.exports = osInfo;