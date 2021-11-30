import client from "../client";

export default {
    Room:{
        messages:async ({id})=>{
            console.log("id::",id)
            const result=  await client.room.findMany({where:{
                id,
                messages:{
                    some:{roomId:id}
                }
            }},)
            console.log(result)
            return result
        },
        users:({id})=>client.room.findFirst({where:{id}}).users(),

        // 해당 Room의 안읽은메시지 표시(사용자 별)
        // unReadTotal:({id},_,{loggedInUser})=>client.room.count({
        //     where:{
        //         id,
        //         read:false,
    
        //     },
        //     users:{
        //         where:{
        //             Not
        //         }
        //     }
            
        // })
      
    },
    Message:{
  
    }
    
}