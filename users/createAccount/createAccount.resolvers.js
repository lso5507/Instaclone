import bcrypt from "bcrypt"
import client from "../../client"

export default{
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


    }
}