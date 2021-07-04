import jwt  from 'jsonwebtoken'
import client from '../client'

export const getUser = async(token) =>{
    try{
        if(!token){
            return null
        }
        const {id} = jwt.verify(token,process.env.SECRET_KEY)
        const user =await client.user.findUnique({where:{id}});
        
        if(user){
            return user;
        }
        else{
            return null;
        }
    }
    catch{
        return null;
    }
}

export const protectedResolver = (ourResolver)=>(root,args,context,info)=>{

    const query =  info.operation.operation === "query"
    if(query){
        if(!context.loggedInUser){
            return null
        }
    }else{
        if(!context.loggedInUser){
            return{
                ok:false,
                error:"Please check to login"
            }
        }
    }
    console.log("protectedResolver In Success")
    return ourResolver(root,args,context,info);

}

