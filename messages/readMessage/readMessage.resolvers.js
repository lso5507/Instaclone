import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation:{
        readMessage:protectedResolver(async(_,{id},{loggedInUser})=>{
        
            const message = await client.message.findFirst({
                where:{
                    id,
                    //loggedInUser가 보낸 메시지가 아닌경우
                    userId:{
                        not:loggedInUser.id
                    },
                    room:{
                        users:{
                            some:{
                                id:loggedInUser.id
                            }
                        }
                    }
                },
                select:{
                    id:true
                }
            })
            //메시지를 찾을수 없음
            if(!message){
                return{
                    ok:false,
                    error:"Message Not Found",
                }
            }
            // 읽은메시지 처리
            await client.message.update({
                where:{
                    id
                },
                data:{
                    read:true
                }
            })   
            return{
                ok:true
            }
            
        })
    }
}
