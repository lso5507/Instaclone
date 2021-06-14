import { protectedResolver } from "../users.utils"
import client from "../../client"
const resolverFn = async(_,{userName},{loggedInUser})=>{
    if(!await client.user.findUnique({where:{userName}})){ //UserName Check
        console.log("IN")
        return {
            ok:false,
            error:"NotFounded UserName"

        }
    }
    await client.user.update({
        where:{
            id:loggedInUser.id
        },
        data:{
            following:{
                disconnect:{
                    userName
                }
            }
        }

    })
    return {
        ok:true
    }

}

export default{
    Mutation:{
        unfollowerUser:protectedResolver(resolverFn)
    }
}