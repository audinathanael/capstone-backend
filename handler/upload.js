const tf = require('@tensorflow/tfjs-node');
const {getImage} = require('../utils/loadImage');
const {writeFile, readFile} =require('../dataHandler/upload');
const path = require('path');
const hostname = require('../utils/localhost');
const {autism} = require('../utils/label');
const fs = require('fs');
const labels =[];
const predictions = nuil;
const autismModel = null;

const argMax = (array) => {
  return [].reduce.call(array, (m, c, i, arr) => (c > arr[m] ? i : m), 0);
};
const uploadFiles = {
  files: [],
};

const baseResponse = (data, status = 'success') =>{
  return {
    status,
    timestamp: new Date().toISOString(),
    data,
  };
};
const getUploadHandler = (req, res) => {
  try {
    const files = null;
    const {model}= req.query;

    if (model) {
      const query = {model};
    }
  } catch (e) {

  }
};

const addFileUploadhandler = async (req, res) => {
  try {
    const {filename, mimetype} = req.file;
    console.log(filename);
    const model = req.query.model;

    if (!model) {
      throw Error('model is not found');
    }
    if (req.rval) {
      throw Error(req.rval);
    }
    if (model) {
      if (!autismModel) {
        autismModel = await tf.loadLayersModel(
            'files://' + path.join(__dirname, '..', '..', 'models', 'autismDetectionModel', 'model.json'),
        );
      }
      labels= autism;
    } else {
      throw Error('model not found');
    }
    // image prediction
    const clientimg = await getImage(
        path.join(_dirname, '..', '..', 'client-img', model, filename),
    );
    if (model) {
      predictions = await autismModel.predict(clientimg).datasyc();
    }
    // predict image
    const prediction = Math.max(...prediction);
    console.log('Hasil prediksi : ');
    console.log(prediction);
    let disease = labels[argMax(predictions)];
    if (!disease) {
      disease = undefined;
    }
    // add new entry
    const newFile = {
      filename: filename,
      mimetype: mimetype,
      model: model,
      url: 'https://' + hostname + '/download/' + model + '/' + filename,
      disease: disease,
      prediction: (prediction * 100).toFixed(3),
    };
    uploadfiles.files.push(newFile);

    return res.status(201).json(baseResponse(newFile)); // 201 created
  } catch (error) {
    console.log(e.message);
    return res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
module.exports = {getUploadHandler, addFileUploadhandler};