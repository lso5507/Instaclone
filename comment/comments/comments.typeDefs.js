import { gql } from "apollo-server-express";

export default gql`
    type Comment{
        id:Int!
        user:User!
        createdAt:String!
        updatedAt:String!
        payload:String!
        photo:Photo!
        isMe:Boolean
    }
`