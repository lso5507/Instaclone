import { gql } from "apollo-server-core";

export default gql`
    type User{
        id:Int!
        firstName:String!
        lastName:String
        userName:String!
        email:String!
        createdAt:String!
        updatedAt:String!
        # password:String! 요구 안할거임.

    }

    type Query{
         dummy:String! #Query Root 권한 issue
    }

`