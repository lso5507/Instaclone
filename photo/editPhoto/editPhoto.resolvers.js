import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

export default{
    Mutation:{
        editPhoto:protectedResolver(async(_,{id,caption},{loggedInUser})=>{

            const oldPhoto  = await client.photo.findFirst({
                where:{
                    id,
                    userId:loggedInUser.userId
                },
                include:{
                    hashtags:{
                        select:{
                            hashtag:true
                        }
                 }
                }   
            })
            if(!oldPhoto){
                return { 
                    ok:false,
                    error:"photo not Found"
                }
            }
            const Photo = await client.photo.update({
                where:{id},
                data:{
                    caption,
                    hashtags:{
                        disconnect:oldPhoto.hashtags,
                        connectOrCreate:processHashtags(caption)
                    }
                },
            })
            console.log(Photo)
            return{
                ok:true,
                
            }
        })
    }
}