const tf = require('@tensorflow/tfjs-node');
const jimp = require('jimp');

const preProcess = (image) => {
  image.resize(150, 150);
  const values = image.bitmap.data;
  const outShape = [1, image.bitmap.width, image.bitmap.height, 4];
  let input = tf.tensor4d(values, outShape, 'float32');

  // eslint-disable-next-line max-len
  input = input.slice([0, 0, 0, 0], [1, image.bitmap.width, image.bitmap.height, 3]);

  return input;
};

const loadLocalImage = async (filename) => {
  try {
    const image = await jimp.read(filename);
    return preProcess(image);
  } catch (error) {
    console.log('error loading image ', error);
  }
  return this.image;
};

const getImage = async (filename) =>{
  try {
    this.image = await loadLocalImage(filename);
  } catch (error) {
    console.log('error loading image');
  }
};

module.exports = {getImage};