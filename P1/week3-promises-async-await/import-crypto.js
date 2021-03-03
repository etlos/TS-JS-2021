const getSecureRandoms = require('./CryptoPromise');
const EvenMorestupidArray = [0,2,1,2,3,4,5]
const stupidArray = [48,40,32,24,16,8,4,3,2,1]

getSecureRandoms(stupidArray).then(obj => {console.log(obj)})

async function test() {
    try {
      const data = await getSecureRandoms(EvenMorestupidArray)
      console.log(data)
    } catch (e) {
      console.log(e)
    } finally {
      console.log("Done with async/await")
    }
}
test();