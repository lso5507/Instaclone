import { gql } from "apollo-server";

export default gql`
    type Mutation{
        upload(file:String! caption:String):Photo

        
    }
`