import { gql } from "apollo-server";

export default gql`
    type Mutation{
        upload(file:Upload! caption:String):MutationResponse

        
    }
`