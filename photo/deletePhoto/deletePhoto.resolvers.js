import { PrismaDelete } from "@paljs/plugins"
import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default{
    Mutation:{
        deletePhoto:protectedResolver(async(_,{id},{loggedInUser})=>{
            const photo = await client.photo.findUnique({
                where:{id},
                select:{userId:true}
            })
            if(!photo){                         //해당하는 Photo가 없을 때
                return{
                    ok:false,
                    error:"Not Founded Photo"
                }
            }
            if(photo.userId!==loggedInUser.id){  //유저가 없을 때
                return{
                    ok:false,
                    error:"Not Matched User"
                }
            }

            const ok = await client.photo.delete({
                where:{id}
            })

            // const PD = new PrismaDelete(client) //onDelete 기능 사용
            // console.log(PD)
            // const ok = await PD.onDelete({
            //     model:"Photo",
            //     where:{
            //         id
            //     },
            //     deleteParent:true, // 자기자신도 삭제한다는 의미
            // })
            if(!ok){                                // 예상치 못한 오류 
                return{
                    ok:false,
                    error:"Exception!!"
                }
            }
            console.log(ok)
            return {
                ok:true
            }

        })
    }

}