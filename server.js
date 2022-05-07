require("dotenv").config()
import express from 'express'
import  {ApolloServer} from "apollo-server-express";
import {resolvers,typeDefs} from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import http from "http"


const server = new ApolloServer({
    resolvers,typeDefs,
    context:async({req}) =>{
        if(req){
            return{
                loggedInUser:await getUser(req.headers.token)
                }
        }
    
    }

})
const PORT = process.env.PORT
const app = express();
app.use(logger("tiny"))

app.use("/static",express.static("upload"))
server.applyMiddleware({app});
//SubScription 동작을 위한 Http Server 선언
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT,()=>{
    console.log(`Server is Running localhost:${PORT}`)
})
