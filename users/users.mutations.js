import client from "../client"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
export default {
    Mutation:{
        createAccount:async (_,{
            firstName,
            lastName,
            userName,
            email,
            password
        })=>{
            // check if username or email are already on DB
            try{
                const existingUser = await  client.user.findFirst({
                    where:{
                        
                    OR : [
                        {
                            userName,
                        },
                        {
                            email,
                        }
                    ]}
                })
                if(existingUser){
                    throw new Error("This Username/email is already taken")
                }
                const uglyPasswrod = await bcrypt.hash(password,10)
                return client.user.create({data:{
                    userName,email,firstName,lastName,password:uglyPasswrod
                }})
                
            }catch(e){
                return e;

            }

            
        },

        login : async(_,{userName,password})=>{
            const user=  await client.user.findFirst({where:{userName}});
            if(!user){
                return{
                    ok:false,
                    error:"User not Found"
                }
            }
            const passwordOk = await bcrypt.compare(password,user.password)
            if(!passwordOk){
                return{
                    ok:false,
                    error:"Incorrect Password",
                };
            }
            // 정보가 맞을때.
            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY)
            return {
                ok:true,
                token,
            }
            
        }
    }

}