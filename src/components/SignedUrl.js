// import AWS from 'aws-sdk'
// import { KeyId,AccessKey } from '../api';
// const s3 = new AWS.S3({
//   accessKeyId: KeyId,
//   secretAccessKey: AccessKey,
//   region: 'ap-south-1',
//   apiVersion: '2006-03-01' // Add this line
  
// });
// let bucketName = 'officecrm560';
// const triggerFunction = (extension,foldername) => {

// // let key1=`${foldername}/${Date.now().toString()}.${extension}`
// // let key1=`${Date.now().toString()}.${extension}`
// let key1=`${foldername}/${extension}`

  
//   // Generate a signed URL for uploading the file to S3
//   let signedUrl = s3.getSignedUrl('putObject', {
//     Bucket: bucketName,
//     Key: key1,
//     Expires: 300,
//   });
//   let arr=[]
//   arr.push(signedUrl,key1)
//   //////////////////console.log(arr)
// return arr
//   };

//   const getPredefinedUrl = (key1) => {
//     return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key1}`;
//   };
  
  
//   export { triggerFunction, getPredefinedUrl };


import AWS from 'aws-sdk'
import axios from "axios";
import { KeyId,AccessKey } from '../api';
const s3 = new AWS.S3({
  accessKeyId: KeyId,
  secretAccessKey: AccessKey,
  region: 'ap-south-1',
  apiVersion: '2006-03-01' // Add this line
});
let bucketName = 'officecrm560';
// const triggerFunction = async (extension,foldername) => {

// // let key1=${foldername}/${Date.now().toString()}.${extension}
// let key1=``
// // let key1 = foldername ? `${foldername}/${extension}` : `/${extension}`;
// //////console.log(foldername)
// let earr=extension.split('.')
// ////////console.log(earr,Date.now())
// if(foldername[foldername.length-1]=='/'){
//   // //////////////console.log("here")

//   key1=`${foldername}${earr[0]}${Date.now()}.${earr[1]}`
// }
// else if(foldername.length!=0){
//   // //////////////console.log("there")
//   key1 = `${foldername}/${earr[0]}${Date.now()}.${earr[1]}` 
// }
// else{
//   key1=`/${earr[0]}${Date.now()}.${earr[1]}`
// }
  
//   // Generate a signed URL for uploading the file to S3
//   // let signedUrl = s3.getSignedUrl('putObject', {
//   //   Bucket: bucketName,
//   //   Key: key1,
//   //   Expires: 300,
//   // });
//   await axios.post("https://jiycm07tpk.execute-api.ap-south-1.amazonaws.com/prod/gsu",{
//     bucket:bucketName,
//     key1,
//     Expires: 300,
//   }).then((res)=>{
//   let arr=[]
  
//     arr.push(res.data.signedUrl,key1)
//     //console.log(arr)
//     return arr
 
 
  
//   })
//   };


const triggerFunction = async (extension, foldername) => {
  let key1 = '';
  let earr = extension.split('.');

  if (foldername[foldername.length - 1] == '/') {
    key1 = `${foldername}${earr[0]}${Date.now()}.${earr[1]}`;
  } else if (foldername.length != 0) {
    key1 = `${foldername}/${earr[0]}${Date.now()}.${earr[1]}`;
  } else {
    key1 = `/${earr[0]}${Date.now()}.${earr[1]}`;
  }

  try {
    const response = await axios.post("https://jiycm07tpk.execute-api.ap-south-1.amazonaws.com/prod/gsu", {
      bucket: bucketName,
      key1,
      Expires: 300,
    });

    let arr = [response.data.signedUrl, key1];
    //console.log(arr); // Log the array containing signedUrl and key1

    return arr; // Return the array as the result of triggerFunction
  } catch (error) {
    console.error('Error fetching signedUrl:', error);
    throw error; // Propagate the error if needed
  }
};

  const getPredefinedUrl = (key1) => {
    // Replace all spaces with '+'
    //console.log(key1)
    const modifiedKey = key1.replace(/ /g, '+');
    return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${modifiedKey}`;
};
  
  
  export { triggerFunction, getPredefinedUrl };