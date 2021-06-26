import client from "../client";

export default{

    Photo:{
        user:({id})=>client.user.findUnique({
            where:{id}
        }),
        hashtags:({id})=>client.hashtag.findMany({
            where:{
                photos:{
                    some:{id}
                }
            }
        }),
        
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
                take:5,
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