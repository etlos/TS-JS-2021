//CALLBACK HELL

console.log("start")

function loginUser (email, password, callback) {
    setTimeout(() => {
        console.log("Now we have the user email")
        callback({ userEmail: email})
    }, 3000)
}

function getFriends(email, callback) {
    setTimeout(() => {
        callback(["Hans", "Sarah", "Søren"])
    }, 2000)
}

function friendDetails(friend, callback) {
    setTimeout(() => {
        callback("Friend name")
    }, 2000)
}
const user = loginUser("andreas@google.com", 123456, user => {
    console.log(user)
    getFriends(user.userEmail, friends => {
        console.log(friends)
        friendDetails(friends[0], details => {
            console.log(details)
        } )
    })
})

console.log("Finish")

//PROMISE BASED

console.log("start");

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Now we have the user email");
      resolve({ userEmail: email });
    }, 3000);
  });
}

function getFriends(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Hans", "Sarah", "Søren"]);
    }, 2000);
  });
}

function friendDetails(friend) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Friend name");
    }, 2000);
  });
}

loginUser("andreas", 123456)
  .then((user) => getFriends(user.email))
  .then((friend) => friendDetails(friend[0]))
  .then((detail) => console.log(detail))

//Synkron stil med Async Await

async function displayUser() {
  try {
    const loggedUser = await loginUser("andreas", 123455);
    const friend = await getFriends(loggedUser.userEmail);
    const detail = await friendDetails(friend[0]);
    console.log(detail);
  } catch (err) {
    console.log("Could not find your friends");
  }
}

displayUser();
console.log(displayUser())
console.log("Finish");
