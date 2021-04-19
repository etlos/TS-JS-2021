/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"


const ALL_FRIENDS = gql`
query {
  getAllFriends 
  {
    id
  	firstName
  	lastName
  	email
  	role
  }
}
`

export default function All() {
  const {loading,error,data} = useQuery(
    ALL_FRIENDS,
    {}
    )
    if (loading) return <p>loading...</p>
    if (error) return <p>{error.toString()}</p> 
    return (
    <div>
      {data.getAllFriends.length}
    </div>
    )
}