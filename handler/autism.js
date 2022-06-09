/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const {getImage} = require('../utils/loadImage');
const {writeFile, readFile} = require('../dataHandler/autism');
const {downloadModel} = require('../utils/downloadModel');
const {readFile: readUploadFile} = require('../datahandler/upload');
const hostname = require('../utils/localhost');
const autismData ={
  autism: [],
};
const modelFile = null;

const argMax = (array) => {
  return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0);
};

const labels = [
  'Autistic',
  'Non-Autistic',
];

const getAutismHandler = async (req, res) => {
  try {
    autismData = readFile();
    const autism = autismData.autism;
    return res.status(200).json({
      status: 'success',
      data: {
        autism,
      },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
  return res.status(500).json({
    status: 'failed',
    message: 'internal server execption',
  });
};

const predictAutismHandler = async (req, res) => {
  try {
    if (!modelFile) modelFile = await tf.loadLayersModel('files://' + path.join(__dirname, '..', 'models', 'AutismDetection_model', 'model.json'));
    const {model, img}= req.body;
    // error thrower
    if (!img) throw Error('harus menampilkan url gambar!');
    if (!model) throw Error('harus menambahkan nama gambar');
    const uploadFiles = readUploadFile();
    const files = uploadFiles.files;
    const index = files.filter((n) => n.filename === img)[0];
    if (index === undefined) throw Error('gambar tidak ditemukan');

    const clientimg = await getImage(path.join(__dirname, '..', 'autism', img));

    console.log(clientimg);
    // predict image
    const predictions = await modelFile.predict(clientimg).dataSync();
    const prediction = Math.max(...predictions);
    const disease = labels[argMax(prediction)];
    const url = 'http://'+ hostname + '/download/' +model + '/' + img;

    const newAutism = {
      model: model,
      imageName: img,
      imageUrl: url,
      disease: disease,
      prediction: prediction.toFixed(3),
    };
    autismData.autism.push(newAutism);
    writeFile(autismData);
    for ( let i = 0; i <predictions.length; i++) {
      const label = labels[i];
      const probability = predictions[i];
      console.log(`${label}: ${probability}`);
    }

    return res.status(200).json({
      status: 'success',
      model: model,
      disease: disease,
      prediction: `${(prediction *100).toFixed(3)}%`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
  return res.status(500).json({
    status: 'failed',
    message: 'internal server execption',
  });
};

module.exports = {getAutismHandler, predictAutismHandler};