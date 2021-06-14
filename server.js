require("dotenv").config()
import express from 'express'
import  {ApolloServer} from "apollo-server-express";
import {resolvers,typeDefs} from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";



const server = new ApolloServer({
    resolvers,typeDefs,
    context:async({req}) =>{
        return{
        loggedInUser:await getUser(req.headers.token)
        }
    }

})
const PORT = process.env.PORT
const app = express();
app.use(logger("tiny"))
app.use("/static",express.static("upload"))
server.applyMiddleware({app});
app.listen({port:PORT},()=>{
    console.log(`Server is Running localhost:${PORT}`)
})
