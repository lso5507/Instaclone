import { gql } from "apollo-server";

export default gql`
type seeFollowingResult{
    ok:String!
    error:String
    following:[User]
}
type Query{
    seeFollowing(userName:String!,lastId:Int):seeFollowingResult!
}

`