import client from "../../client"


export default{
    Query:{
        seeFollower: async (_,{userName,page})=>{
            //Error Throw..
            const ok  = await client.user.findFirst({where:{userName},select:{id:true}})
            if(!ok){
                return{
                    ok:false,
                    error:"User Not Found"
                }
            }

           const followers= await client.user.findUnique({where:{userName}}).followers({
               take:5,
               skip:(page-1)*5, 

           });
           const totalCount = await client.user.count({ //count로 사이즈만 잼 -> 리소스 절약
               where:{following:{some:{userName}}}
           })
  
           return {
               ok:true,
               followers,
               totalPages:Math.ceil(totalCount/5)
               
           }
           


        }

    }
}