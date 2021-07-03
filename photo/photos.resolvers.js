import client from "../client";

export default{

    Photo:{
        user:({userId})=>client.user.findUnique({
            where:{
                id:userId
            }
        }),
        hashtags:({id})=>client.hashtag.findMany({
            where:{
                photos:{
                    some:{id}
                }
            }
        }),
        likes:({id})=>client.like.count({where:{photoId:id}}),
        isMe:({userId},_,{loggedInUser})=> loggedInUser?loggedInUser===userId:false,
        comments:({id})=>client.comment.findMany({where:{photoId:id}})
        
    },
    Hashtag:{
        photos:({id},{page})=>{    
            console.log("id::",id)
            console.log("page::",page)
            return client.hashtag.findUnique({
                where:{
                    id
                },
            }).photos({
                skip:page?1:0,
                take:10,
                cursor:{
                    id:page
                }

            })

        },
        totalPhotos:({id})=>client.photo.count({where:{
            hashtags:{
                some:{
                    id
                }
            }
        }
    })


    }
    
}