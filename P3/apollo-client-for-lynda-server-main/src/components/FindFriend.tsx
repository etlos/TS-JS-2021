/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

const GET_FRIEND = gql`
 query getFriend($id: ID) {
    getFriend(id:$id){
     id
     email
     age
     firstName
     lastName
     gender
   }
}
`

export default function FindFriend() {
  const [id, setId] = useState("")
  const [] = useLazyQuery(
    GET_FRIEND,
    {}
  );

  const fetchFriend = () => {
    alert(`Find friend with id: ${id}`)
  }

  return (
    <div>
      ID:<input type="txt" value={id} onChange={e => {
        setId(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      <h2>Fetch a friend using the provided id</h2>

    </div>)
}
