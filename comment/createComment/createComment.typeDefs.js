import { gql } from "apollo-server-express";

export default gql`
    type createCommentResult{
        ok:String!
        error:String
    }
    type Mutation{
        createComment(payload:String!,photoId:Int!):createCommentResult
    }
`