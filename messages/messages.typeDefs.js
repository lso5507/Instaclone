import { gql } from "apollo-server-express";

export default gql`
    type Room{
        id:Int!
        createdAt:String!
        updatedAt:String!
        messages:[Message]
        users:[User]!

    }
    type Message{
        user:User!
        id:Int!
      #unReadTotal:Int!
        payload:String
        room:Room!
        createdAt:String!
        updatedAt:String!
    }
`