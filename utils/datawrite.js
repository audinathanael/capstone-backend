const fs = require('fs');

// read file json
const readFileUtil = (filepath) => {
  try {
    const jsonString = fs.readFileSync(filepath, 'utf8');
    const parsedjson = JSON.parse(jsonString);
    if (!parsedjson) {
      const obj = {};
      writeFile(obj, filepath);
      // file json dibuat
      // console.log('New JSOn initialized')
    }
    console.log('read completed');
    // console.log(parsedjson)
    return parsedjson;
  } catch (err) {
    console.log(err);
    return;
  }
};

const writeFileUtil = (arr, filepath) => {
  try {
    const jsonString = JSON.stringify(arr);
    fs.writeFileSync(filepath, jsonString);
    console.log('write completed');
    return;
  } catch (error) {
    console.log(err);
    return;
  }
};

module.exports = {readFileUtil, writeFileUtil};