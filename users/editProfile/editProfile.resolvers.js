import client from "../../client"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
export default{
    Mutation:{
        editProfile:async(_,{firstName,lastName,userName,email,password:newPassword},{loggedInUser})=>{
            let uglyPassword = null 
            
            console.log(loggedInUser)
            
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
    }
} 