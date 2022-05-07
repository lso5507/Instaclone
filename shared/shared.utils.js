import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId:process.env.AWS_KEY,
    secretAccessKey:process.env.AWS_SECRET

})

export const uploadToS3 = async(avatar,userid,folerName)=>{
    const {filename,createReadStream}=await avatar
    const newFileName = `${folerName}/${userid}+${Date.now()}+${filename}`;
    const readStream = createReadStream();
    
    const ok = await new AWS.S3().upload({
        Bucket:"swlee-instaclone",
        Key:newFileName,
        ACL:"public-read",
        Body:readStream
    })
    .promise();
    console.log(ok)
    return ok.Location;
}
