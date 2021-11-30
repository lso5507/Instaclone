import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {

    Query:{
        seeMessages:protectedResolver(async(_,__,loggedInUser)=>
        client.room.findMany({
            where:{
                users:{
                    some:{
                       id:loggedInUser.id
                    }
                }
            }
        }))
    }
}