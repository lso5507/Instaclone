import client from "../../client";

export default {
    Query:{
        
        seePhoto:async(_,{id})=>{ 
            
            console.log(id)
            return client.photo.findUnique({
                where:{id}
            })
    }
    }
}