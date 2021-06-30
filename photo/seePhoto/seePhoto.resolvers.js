import client from "../../client";

export default {
    Query:{
        
        seePhoto:async(_,{id})=>{ 
            

            const ok= await client.photo.findUnique({
                where:{id}
            })
            console.log(ok)
            return ok;
    }
    }
}