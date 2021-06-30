import client from "../../client";

export default{

    Query:{
        seeFeed:async(_,__,{loggedInUser})=>{
           const ok = await client.photo.findMany({
                where:{
                    OR:[
                        {
                            user:{
                                followers:{
                                    some:{
                                         id:loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userId:loggedInUser.id
                        }
                    ]
                },
                orderBy:{
                    createdAt:"asc"
                }
                
            })
                
            console.log(ok)
            return ok;
          
        }
    }
}