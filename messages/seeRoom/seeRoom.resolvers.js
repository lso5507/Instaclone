import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {

    Query:{
         seeRoom:protectedResolver(async(_,{id})=>{
            //Unique Id 값으로 검색 return Room
            return await client.room.findUnique({
                where:{id}
            })

        })
    }
}