import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const createUserList = (userArray)=>{
    //전달받는 유저배열 map 
    return userArray.map((id)=>({
        id:id
        
    }))
}
export default {
    Mutation:{
        sendMessages:protectedResolver(async(_,{payload,roomId,userId},{loggedInUser})=>{
            

            
            const user = client.user.findUnique({  
                where:{
                    id:loggedInUser.id
                },
                select:{
                    id:true,
                }
            })
            if(!user){
                return {
                    ok:false,
                    error:"Not Found User"
                }
            }
            let room =null
            const Users = createUserList(userId)
            const userCount=Users.push({id:loggedInUser.id})
            
            //룸 생성 로직
            if(!roomId){
                 room= await client.room.create({   // Room이 없을시 룸 생성
                    data:{
                        users:{
                            connect:Users,
                        
                        },
               

                    }
                })
                console.log("roomCreate::",room)
                
            }
            else{    // 이미 생성 된 대화방이 있을경우
                room = await client.room.findUnique({
                    where:{id:roomId},
                    select:{id:true,users:true}
                })
                console.log(room)

            }
            //유저 연결 로직
            
            console.log(room)
            await client.message.create({   //메시지 전송
                data:{
                    payload,
                    user:{
                        connect:{
                            id:loggedInUser.id
                        }
                    },
                    room:{
                        connect:{
                            id:room.id
                        }
                    },
                    readUser:loggedInUser.id

                }
            })
            return {
                ok:true
            }

        })
    }
}