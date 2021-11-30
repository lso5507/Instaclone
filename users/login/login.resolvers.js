import client from "../../client"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
export default {
    Mutation:{

        login : async(_,{userName,password})=>{
            console.log(userName)
            const user=  await client.user.findUnique({where:{userName}});
            
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
            console.log("user::",user)

            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY)
            return {
                ok:true,
                token,
            }
            
        }
    }

}