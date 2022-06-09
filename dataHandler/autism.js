const path = require('path');
const {readFileUtil, writeFileUtil} = require('../utils/datawrite');
const autismFile = path.join(__dirname, '...', 'database', 'autismData.json');

// read file that from util
const readFile = () => {
  try {
    const parsedJson = readFileUtil(autismFile);
    return parsedJson;
  } catch (error) {
    console.log(error);
    return;
  }
};

// read write that from util
const writeFile = (arr) => {
  try {
    writeFileUtil(arr, autismFile);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {writeFile, readFile};