const path = require('path');
const {readFileUtil, writeFileUtil} = require('../utils/datawrite');
const uploadFile = path.join(__dirname, '..', 'database', 'fileData.json');

const readFile = () => {
  try {
    const parsedJson = readFileUtil(uploadFile);
    return parsedJson;
  } catch (error) {
    console.log(error);
    return;
  }
};

const writeFile = (arr) => {
  try {
    writeFileUtil(arr, uploadFile);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {readFile, writeFile};