
const readPDF = require('../scripts/readPDF');
const constants = require('../scripts/constants');
const scrapper = require('../scripts/webScrapper');

let isAllPDFsDownloaded = false;

// const utils = require('../scripts/utils');

module.exports.getHomeData = (req, res) => {
  res.render('index.ejs');
};

module.exports.createPDF = async (req, res) => {
  try {
    const postcode = req.body.code;
    isAllPDFsDownloaded = false;
    scrapper.scrapeRealtor(postcode).then((data) => {
      if (data) {
        console.log('Done with scrapping and creating PDFs');
        isAllPDFsDownloaded = true;
      }
    });
    res.render('getPDF.ejs');
  } catch (err) {
    console.log('Something went wrong');
    console.error(err);
    res.sendStatus(500).send(err);
  }
};


module.exports.getDatafromPDF = async (req, res) => {
  try {
    console.log('Service called to get data from pdf');
    if (isAllPDFsDownloaded) {
      const response = await readPDF.readPDF(constants.root);
      res.json(response);
    } else {
      res.render('getPDF.ejs');
    }
  } catch (err) {
    console.log('Something went wrong');
    console.error(err);
    res.sendStatus(500).send(err);
  }
};
