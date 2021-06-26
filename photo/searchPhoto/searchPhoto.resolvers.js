import client from "../../client";

export default{

    Query:{
        searchPhoto:async(_,{keyword})=>
        client.photo.findMany({
            where:{
                caption:{
                    startsWith:keyword
                }
            }
        })
    }
}