const fs = require('fs');
const pdf = require('pdf-parse');
const constants = require('./constants');

const DEFAULT_OPTIONS = {
  max: 1,
};
// eslint-disable-next-line no-async-promise-executor
const getArea = (filepath) => new Promise(async (resolve) => {
  const pdfBuffer = fs.readFileSync(filepath);
  try {
    const pdfData = await pdf(pdfBuffer, DEFAULT_OPTIONS);
    const lines = pdfData.text.split('\n');
    // eslint-disable-next-line no-restricted-syntax
    for (const line of lines) {
      if (line && line.includes(constants.TOTAL_AREA_KEY)) {
        const secondaryLines = line.split(':');
        for (let i = 0; i < secondaryLines.length; i += 1) {
          if (secondaryLines[i].includes(constants.TOTAL_AREA_KEY)) {
            resolve(secondaryLines[i + 1]);
            break;
          }
        }
      }
    }
    resolve('Corrupted File');
  } catch (err) {
    console.log('Error ocuccured while reading file :', err);
    resolve('Corrupted File');
  }
});

// eslint-disable-next-line no-async-promise-executor
module.exports.readPDF = async (directory) => new Promise(async (resolve) => {
  if (fs.existsSync(directory)) {
    const filenames = fs.readdirSync(directory);
    const response = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const filename of filenames) {
      if (filename && !filename.startsWith('.')) {
        console.log('Getting Data from PDF :', filename);
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
  } else {
    resolve([]);
  }
});
