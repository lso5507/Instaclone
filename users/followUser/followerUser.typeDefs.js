import { gql } from "apollo-server-core";
export default gql`
    type FolloweUserResult {
        ok:Boolean!
        error:String
    }
    type Mutation{
        followerUser(
            userName:String!
            
        ):FolloweUserResult!
    }
`