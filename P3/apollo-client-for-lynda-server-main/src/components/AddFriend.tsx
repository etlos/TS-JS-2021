import React, { useState } from "react";
import ILyndaFriend, { Gender } from "../interfaces/interfaces"
import { useMutation , gql } from "@apollo/client"

const ADD_FRIEND = gql`
mutation createFriend($friend:FriendInput) {
  createFriend(input:$friend){
    firstName
    lastName
    email
    age
    gender
    id
  }
}`

type AddFriendProps = {
  initialFriend?: ILyndaFriend
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}
const AddFriend = ({ initialFriend }: AddFriendProps) => {
  const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", gender: "OTHER", age: -1, email: "" }
  let newFriend: ILyndaFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }
  const [friend, setFriend] = useState({ ...newFriend })

  const handleChange = (event: any) => {
    const id = event.currentTarget.id;
    let friendToChange: IKeyableFriend = { ...friend }
    friendToChange[id] = event.currentTarget.value;
    setFriend({ ...friendToChange })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(friend))
    //Todo save friend on servers
    setFriend({ ...EMPTY_FRIEND })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Gender &nbsp;
          <select id="gender" value={friend.gender} onChange={handleChange}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <br />
      <label>
        Age <br />
        <input type="number" id="age" value={friend.age} onChange={handleChange} />
      </label>
      <br /><br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddFriend;