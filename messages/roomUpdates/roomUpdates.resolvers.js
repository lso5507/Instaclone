import { withFilter } from "apollo-server-express";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default{
    Subscription:{
        roomUpdates:{
            subscribe:async(root,args,context,info)=>{
                const room = await client.room.findFirst({
                    where:{
                        id:args.id,
                        users:{
                            some:{
                                id:context.loggedInUser.id
                            }
                        }
                    },
                    select:{
                        id:true
                    }

                })
                
                if(!room){
                    // Subscription 사용 시 Null 리턴은 자제
                    throw new Error("You Shall not see this")
                }
                /*
                Resolver Function을 Return 해야함.
                            Function          Function      resolverFn
                withFilter(asnycIterator()=>,FilterFn()=>)(root,args,context,info)
                withFilter의 리턴 값은 ResolverFn 이므로 ResolverFn(root,args,context,info)함수가 실행되는 것과 같다
                */
                return withFilter(
                    ()=>pubsub.asyncIterator(NEW_MESSAGE),
                    async ({roomUpdates},{id},{loggedInUser})=>{
                        
                        if (roomUpdates.roomId===id){ //전달받은 roomId가 같을 때
                            const room = await client.room.findFirst({
                                where:{
                                    id:args.id,
                                    users:{
                                        some:{
                                            id:loggedInUser.id
                                        }
                                    }
                                },
                                select:{
                                    id:true
                                }
            
                            })
                            if(!room){
                                return false
                            }
                            return true
                        }
                    }    
                )(root,args,context,info)                 
                
            }
        }
    }
}