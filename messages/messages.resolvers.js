import client from "../client";

export default {
  Room:{
      users:({id})=>client.room.findUnique({where:{id}}).users(),
      messages:({id})=>{
          client.message.findMany({
              where:{
                  roomId:id,
              }
          })
      },
      unReadTotal:async({id},_,{loggedInUser})=>{
          if(!loggedInUser){
              return 0;
          }
        //각 사용자 별로 해당 Room에 대한 unReadTotal을 보여줘야 한다.
        return await client.message.count({
            where:{
               read:false,
               roomId:id,
               user:{
                   id:{
                       not:loggedInUser.id,
                   }
               }
            }
        })
      }
      
  },
  Message:{
      user:async({id})=>client.message.findUnique({
          where:{
              id
          }
      }).user()
  }
    
}