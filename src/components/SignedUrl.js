import AWS from 'aws-sdk'
import { KeyId,AccessKey } from '../../api';
const s3 = new AWS.S3({
  accessKeyId: KeyId,
  secretAccessKey: AccessKey,
  region: 'ap-south-1',
  apiVersion: '2006-03-01' // Add this line
  
});
let bucketName = 'officecrm560';
const triggerFunction = (extension,foldername) => {

// let key1=`${foldername}/${Date.now().toString()}.${extension}`
// let key1=`${Date.now().toString()}.${extension}`
let key1=`${foldername}/${extension}`

  
  // Generate a signed URL for uploading the file to S3
  let signedUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: key1,
    Expires: 300,
  });
  let arr=[]
  arr.push(signedUrl,key1)
  //console.log(arr)
return arr
  };

  const getPredefinedUrl = (key1) => {
    return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key1}`;
  };
  
  
  export { triggerFunction, getPredefinedUrl };