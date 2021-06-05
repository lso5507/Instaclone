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

    type LoginResult{
        ok:Boolean!
        token:String
        error:String
    }
    type Mutation{
        createAccount(
            firstName:String!
            lastName:String
            userName:String!
            email:String!
            password:String!
        ): User #return 
        login(
            username:String!
            password:String!
            ):LoginResult
    }
    type Query{
        seeProfile(userName:String):User
    }

`