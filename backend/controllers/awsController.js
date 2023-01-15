const aws=require("aws-sdk")

aws.config.update({
    accessKeyId: process.env.AWS_API_KEY,
    secretAccessKey: process.env.AWS_API_SECRET,
    region: process.env.AWS_REGION_NAME
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "mobilemarket",  //HERE
        Key: "abc/" + file.originalname, //HERE
        Body: file.buffer
    }

    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        return resolve(data.Location)
    })
   })
}


module.exports={uploadFile};