import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";
const resolverFn = async(_,{file,caption},{loggedInUser})=>{
    console.log(loggedInUser)
    if(!loggedInUser){
        
        return{
            ok:false,
            error:"NotFound Account Info"
        }
    }
    let hashtagObj = [];
    if(caption){

        hashtagObj=  processHashtags(caption)
    } 
    //AWS Upload
    const fileUrl = await uploadToS3(file,loggedInUser.id,"Uploads")
    await client.photo.create({
        data:{
            file:fileUrl,
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
    return {
        ok:true,
        
    }
}
export default{
    Mutation:{
        upload:protectedResolver(resolverFn)
           

      
        
    }
}