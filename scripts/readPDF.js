const fs = require('fs');
const pdfReader = require('pdfreader');
const constants = require('./constants');

const reader = new pdfReader.PdfReader();
const getArea = (filepath) => new Promise((resolve) => {
  const pdfBuffer = fs.readFileSync(filepath);
  let isAreaLineKicked = false;
  try {
    reader.parseBuffer(pdfBuffer, (err, data) => {
      if (isAreaLineKicked) {
        resolve(data && data.text);
      }
      if (data && data.text && data.text.includes(constants.TOTAL_AREA_KEY)) {
        isAreaLineKicked = true;
      }
      if (!data) {
        resolve('Corrupted File');
      }
    });
  } catch (err) {
    resolve('Corrupted File');
  }
});

// eslint-disable-next-line no-async-promise-executor
module.exports.readPDF = async (directory) => new Promise(async (resolve) => {
  const filenames = fs.readdirSync(directory);
  const response = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const filename of filenames) {
    if (filename && !filename.startsWith('.')) {
      // eslint-disable-next-line no-await-in-loop
      const area = await getArea(`${directory}/${filename}`);
      response.push({
        filename,
        address: filename.split('.')[0],
        area,
      });
    }
  }
  resolve(response);
});
