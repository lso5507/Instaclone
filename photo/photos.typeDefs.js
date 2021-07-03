import { gql } from "apollo-server";

export default gql`
    type Photo{
        id:Int!
        user:User!
        file:String!
        caption: String
        hashtags:[Hashtag]
        createdAt:String!
        updatedAt:String!
        likes:Int
        isMe:Boolean
        comments:[Comment]
    }
    type Hashtag{
        id:Int!
        hashtag:String!
        photos(page:Int):[Photo]
        createdAt:String!
        updatedAt:String!
        totalPhotos:Int!

    }
`