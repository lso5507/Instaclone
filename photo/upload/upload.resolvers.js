import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
const resolverFn = async(_,{file,caption},{loggedInUser})=>{

    if(!loggedInUser){
        
        return{
            ok:false,
            error:"NotFound Account Info"
        }
    }
    let hashtagObj = [];
    if(caption){
        const hashtags = caption.match(/#[\w]+/g)
        
       hashtagObj= hashtags.map((hashtag)=>({
             where:{hashtag},
             create:{hashtag}
         }))
    } 
    console.log(hashtagObj)
    return client.photo.create({
        data:{
            file,
            caption,
            user:{
                connect:{
                    id:loggedInUser.id,
                }
            },
            ...(hashtagObj.length> 0 &&{
                hashtags:{
                    connectOrCreate: hashtagObj,
                }
            })
        }
    })
}
export default{
    Mutation:{
        upload:protectedResolver(resolverFn)
           

      
        
    }
}