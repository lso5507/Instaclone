import client from "../client";

export default {
  Room:{
      unReadTotal:async({id},_,{loggedInUser})=>{
        //각 사용자 별로 해당 Room에 대한 unReadTotal을 보여줘야 한다.
        return await client.room.count({
            where:{
                id,
                messages:{
                    every:{
                        NOT:{
                            readUser:{
                                has:loggedInUser.id
                            }
                        }
                    }
                }
            }
        })
      }
  }
    
}