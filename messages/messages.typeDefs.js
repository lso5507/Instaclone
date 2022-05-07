import { gql } from "apollo-server-express";

export default gql`
    type Room{
        id:Int!
        createdAt:String
        updatedAt:String
        messages:[Message]
        
        users:[User]
        unReadTotal:Int!
    }
    type Message{
        user:User!
        id:Int!
      #unReadTotal:Int!
        payload:String,
        read:Boolean!,
        room:Room!
        createdAt:String!
        updatedAt:String!
    }
`