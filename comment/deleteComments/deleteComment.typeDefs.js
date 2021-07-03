import { gql } from "apollo-server-express";

export default gql`
   type deleteCommentResult{
       ok:String!
       error:String
   }
   type  Mutation{
        deleteComment(commentId:Int!):deleteCommentResult
    }
`