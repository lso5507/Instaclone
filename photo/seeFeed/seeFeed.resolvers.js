import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{

    Query:{
        seeFeed:protectedResolver(async(_,__,{loggedInUser})=>{
            
           const ok = await client.photo.findMany({
                where:{
                    OR:[
                        {
                            user:{
                                followers:{
                                    some:{
                                         id:loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userId:loggedInUser.id
                        }
                    ]
                },
                orderBy:{
                    createdAt:"asc"
                }
                
            })
                
            console.log(ok)
            return ok;
          
        })
    }
}