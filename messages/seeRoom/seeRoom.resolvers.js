
import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {

    Mutation:{
         seeRoom:protectedResolver(async(_,{id},{loggedInUser})=>{
            
            try{
               const dataResult= await client.$transaction(async(client)=>{
                    
                    //Unique Id 값으로 검색 return Room
                    const result= await client.room.findUnique({
                        where:{
                            id,
                            
                        },
                        include:{
                            messages:true,
                            users:{
                                select:{
                                    id:true,
                                }
                            }
                        }
                        
                    })
                    //방에 있는 유저만 읽을수 있음
                    
                    
                    const e = JSON.stringify(result.users)
                    //result.user Value값만 꺼내오기
                    const resultUser_value = JSON.parse(e).map(data => data.id);
                    
                    
                    if(!resultUser_value.includes(loggedInUser.id)){
                        console.log("Not Permission user")
                        return null;
                    }
                    
                    const unReadResult = await client.message.updateMany({
                        where:{
                            roomId:id,
                            // 안읽은 메시지 읽음처리
                            NOT:{
                                readUser:{
                                    has:loggedInUser.id
                                }
                            }
                        },
                        data:{
                            //현재 유저 읽음처리
                            readUser:{
                                push:loggedInUser.id
                            }
                        }
                    })
                    console.log(unReadResult)
                    console.log("result::",result)
                    return result;
                })
                return dataResult
            }catch(err){
                console.log("err::",err)
                return null
            }
    
        })
    }
}