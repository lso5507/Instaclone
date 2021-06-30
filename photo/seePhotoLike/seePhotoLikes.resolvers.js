import client from "../../client"

export default {
    Query:{
        seePhotoLikes:async(_,{id})=>{
            const photo = await client.like.findMany({
                where:{photoId:id},
                include:{
                    user:true  //Select는 선택개념 Include는 추가개념
                }
            })
   
            return photo.map(photo=>photo.user)
        }
    }
}