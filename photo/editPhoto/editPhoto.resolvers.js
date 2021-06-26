import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation:{
        editPhoto:protectedResolver(async(_,{id,caption},{loggedInUser})=>{
            const photo = await client.photo.update({
                where:{id},
                data:{
                    caption
                }
            })

            if(loggedInUser.id!==photo.userId){
                return {
                    ok:false,
                    error:"Not Matched User"
                }
            }
            return{
                ok:true,
                
            }
        })
    }
}