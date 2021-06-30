import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation:{
        toggleLike:protectedResolver(async(_,{id},{loggedInUser})=>{
            const photo  =await  client.photo.findUnique({
                where:{id}
            })
            if(!photo){
                return {
                    ok:false,
                    error:"Photo not Found"
                }
            }
            const whereLike = {
                photoId_userId:{
                    userId:loggedInUser.id,
                    photoId:id
                }
            }
            const like = await client.like.findUnique({
                where:whereLike
            })
            if(!like){
                await client.like.create({
                    data:{
                        user:{
                            connect:{
                                id:loggedInUser.id
                            }
                        },
                        photo:{
                            connect:{
                                id:photo.id
                            }
                        }
                    }
                })
            }else{
                await client.like.delete({
                    where:whereLike,
                })
            }
            return {
                ok:true,
            }
        })
    }
}