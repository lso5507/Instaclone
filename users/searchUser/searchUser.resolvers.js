import client from "../../client";

export default {
    Query:{
        searchUsers:async(_,{keyword,lastId})=>

            client.user.findMany({
                where:{userName:{startsWith:keyword}},
                take:5,
                skip:lastId?1:0,
                ...(lastId &&{cursor:{id:lastId}})  //cursor => 마지막 요소 저장
            })


        
    }
    
}