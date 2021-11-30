import { gql } from "apollo-server-express";

export default gql`
type Mutation{
    sendMessages(payload:String!,roomId:Int,userId:[Int!]):MutationResponse
}
`