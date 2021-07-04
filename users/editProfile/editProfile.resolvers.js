import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { protectedResolver } from "../users.utils"
import {createWriteStream, write} from 'fs'
import { uploadToS3 } from "../../shared/shared.utils"

const resolverFn=async(_,{firstName,lastName,userName,email,password:newPassword,bio,avatar},{loggedInUser})=>{
    let uglyPassword = null 
    let avatarUrl=null
    if(avatar){
        // =====================내 서버에 저장하는 로직==============================
        // const {filename, createReadStream} = await avatar
        // const newFileName = `${loggedInUser.id}+${Date.now()}+${filename}`;
        // const readStream = createReadStream();
        // const writeStream = createWriteStream(process.cwd()+"/upload/"+newFileName);
        // readStream.pipe(writeStream)
        // avatarUrl=`http://localhost:4000/static/${newFileName}`
        // =====================내 서버에 저장하는 로직==============================
        // =====================AWS에 저장하는 로직==============================
         avatarUrl= await uploadToS3(avatar,loggedInUser.id,"Avatars") //Location만 전달 받을거임.
        // =====================AWS에 저장하는 로직==============================
    }
 
    
    if(newPassword){
        uglyPassword = await bcrypt.hash(newPassword,10);
    }
    const updatedUser = await client.user.update({ 
        where:{
            id:loggedInUser.id
        },
        data:{
            firstName,
            lastName,
            userName,
            email,
            bio,
            avatar:avatarUrl,
             
            ...(uglyPassword && {password:uglyPassword}),  //ES6 문법
        }})
        if(updatedUser.id){
            return{
                ok:true 
            }
        }else{
            return{
                ok:false,
                error:"could not update profile"
            }
        }

}
export default{
    Mutation:{
        editProfile:protectedResolver(resolverFn)
    }
} 