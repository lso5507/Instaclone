import client from "../../client";


export default{
    Query:{
        seeFollowing: async(_,{userName,lastId})=>{
            console.log(lastId)
            //Error Throw..
            const ok  = await client.user.findFirst({where:{userName},select:{id:true}})
            if(!ok){
                return{
                    ok:false,
                    error:"User Not Found"
                }
            }
            const following= await client.user.findUnique({where:{userName}}).following({
                take:5,
                skip:lastId?1:0,
                ...(lastId &&{cursor:{id:lastId}})  //cursor => 마지막 요소 저장
                
            });
            return {
                ok:true,
                following
            }
        }
    }
}