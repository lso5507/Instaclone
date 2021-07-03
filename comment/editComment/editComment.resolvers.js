import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{

    Mutation:{
        editComment:protectedResolver(async(_,{id,payload},{loggedInUser})=>{
            const comment =await client.comment.findUnique({
                where:{id},
                select:{userId:true}
            })
            if(!comment){     
                return{
                    ok:false,
                    error:"Not Found Comment Data"
                }
            }
            if(comment.userId!==loggedInUser.id){
                return{
                    ok:false,
                    error:"Not Matched User"
                }
            }
    
            const ok  = await client.comment.update({
                where:{id},
                data:{
                    payload
                }
            })
            console.log("ok::",ok)
            if(!ok){
                return{
                    ok:false,
                    error:"Exception"
                }
            }
            return{
                ok:true
            }
    
    
        })
    }
}