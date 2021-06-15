import { gql } from "apollo-server-core";
export default gql`
    type SeeFollowerResult{
        ok:Boolean!
        error:String
        followers:[User]
        totalPages:Int
    }
    type Query{
        seeFollower(userName:String!,page:Int!):SeeFollowerResult!

    }
`;