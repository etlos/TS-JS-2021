interface IMessage {
    original:string
    upperCased:string
}

function upperCaseDelay(msg:string,delay:number): Promise<IMessage>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({original:msg,upperCased: msg.toUpperCase()});
      },delay)
  
    });
  }
  
  async function tester(){
    const res = await upperCaseDelay("Hello World",500);
    console.log(res.original,res.upperCased);
  }
  
  upperCaseDelay("hello",500)
  