import jwt  from 'jsonwebtoken'
import client from '../client'

export const getUser = async(token) =>{
    try{
        if(!token){
            console.log("Token NotFOUND")
            return null
        }
        const {id} = jwt.verify(token,process.env.SECRET_KEY)
        
        const user =await client.user.findUnique({where:{id}});
        
        if(user){
            return user;
        }
        else{
            console.log("User_NotFound")
            return null;
        }
    }
    catch(err){
        console.log(err)
        return null;
    }
}

export const protectedResolver = (ourResolver)=>(root,args,context,info)=>{

    console.log("protectedResolver IN")
    const query =  info.operation.operation === "query"
    if(query){
        if(!context.loggedInUser){
            console.log("NotFoundLOggedInUser")
            return null
        }
    }else{
        if(!context.loggedInUser){
            console.log("Please check to login")
            return{
                ok:false,
                error:"Please check to login"
            }
        }
    }
    console.log("protectedResolver In Success")
    return ourResolver(root,args,context,info);

}

