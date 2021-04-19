const friendDatabase = {}

class Friend{
    constructor(id, { firstname, lastName, gender, email}){
        this.id = id;
        this.firstname = firstname;
        this.lastName = lastName;
        this.gender = gender;
        this.email =email;
    }
}
const root = { 
    friend: () => {
    return {
        "id": 123023460987134,
        "firstname": "Manny",
        "lastName": "Henri",
        "gender": "Male",
        "email": "me@me.dk"
    }
    },
    createFriend: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        friendDatabase[id] = input;
        return new Friend(id,input);
    }
}