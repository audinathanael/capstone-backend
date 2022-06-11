const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const downloadModel = async (
    bucketName = 'bucket-deteksiautisme',
    fileName = 'AutismDetection_model.h5',
    destFilename = path.join(cwd, ''))=>{
  const options = {
    destination: destFilename,
  };

  await storage.bucket(bucketName).file(fileName).download(options);

  console.log(`gs://${bucketName} downloaded to ${destFilename}`);
};


module.exports = {downloadModel};