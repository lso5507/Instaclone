import  {gql, ApolloServer} from "apollo-server";
import { typeDefs,resolvers} from "./schema";




const server = new ApolloServer({
    typeDefs,
    resolvers

})

server.listen().then( ()=>console.log("Server is Running localhost:4000")) 