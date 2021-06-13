import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { protectedResolver } from "../users.utils"

const resolverFn=async(_,{firstName,lastName,userName,email,password:newPassword,bio,avatar},{loggedInUser})=>{
    let uglyPassword = null 

    const {filename, createReadStream} = await avatar
    const stream = createReadStream();

    console.log(stream)
    console.log(filename)
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