import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type Friend {
        id: ID
        firstname: String
        lastName: String
        gender: String
        email: String
    }

    type Query {
        friend: Friend
    }

    input FriendInput {
        id: ID
        firstname: String
        lastName: String
        gender: String
        email: String
    }

    type Mutation {
        createFriend(input: FriendInput): Friend
    }
`)

export default schema