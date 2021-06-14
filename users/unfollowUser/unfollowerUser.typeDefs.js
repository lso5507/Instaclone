import { gql } from "apollo-server-core";
export default gql`
    type unFolloweUserResult {
        ok:Boolean!
        error:String
    }
    type Mutation{
        unfollowerUser(
            userName:String!
            
        ):unFolloweUserResult!
    }
`