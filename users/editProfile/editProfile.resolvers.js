import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { protectedResolver } from "../users.utils"
import {createWriteStream, write} from 'fs'

const resolverFn=async(_,{firstName,lastName,userName,email,password:newPassword,bio,avatar},{loggedInUser})=>{
    let uglyPassword = null 
    let avatarUrl=null
    if(avatar){
        const {filename, createReadStream} = await avatar
        const newFileName = `${loggedInUser.id}+${Date.now()}+${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd()+"/upload/"+newFileName);
        readStream.pipe(writeStream)
        avatarUrl=`http://localhost:4000/static/${newFileName}`
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