import client from "../client";


export default{
    User:{
        totalFollowing:({id})=>
            client.user.count({
                where:{followers:{some:{id}}}
            }),
        
        totalFollowers:({id})=>
            client.user.count({
                where:{following:{some:{id}}}
            }),
        
        isMe:({id},_,{loggedInUser})=>{
            if(!loggedInUser){
                return false;
            }

            return loggedInUser.id ===id
        },
        isFollowing: async({id},_,{loggedInUser})=>{
            if(!loggedInUser){
                return false;
            }
            const count=await client.user.count({
                where:{
                    userName : loggedInUser.userName,
                    following:{
                        some:{
                            id
                        }
                    }
                }
            })
            console.log("count::",count)
            return Boolean(count)
        }

    }
}