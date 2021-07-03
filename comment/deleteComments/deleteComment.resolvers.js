import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default{
    Mutation:{
        deleteComment:protectedResolver(async(_,{commentId},{loggedInUser})=>{
            const comment = await client.comment.findUnique({
                where:{id:commentId},
                select:{userId:true}

            })
            
            if(!comment){
                return {
                    ok:false,
                    error:"Not Found Comment"
                }
            }

            if(comment.userId!==loggedInUser.id){
                return{
                    ok:false,
                    error:"Not Matched User"
                }
            }
            const ok = await client.comment.delete({
                where:{id:commentId}
            })
            if(ok){
             return {
                 ok:true
             }   
            }else{
                return{
                    ok:false,
                    error:"Exception"
                }
            }

        })
    }

}