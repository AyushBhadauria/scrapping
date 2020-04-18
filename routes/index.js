const readPDF = require('../scripts/readPDF');
const constants = require('../scripts/constants');
const scrapper = require('../scripts/webScrapper');

module.exports.getHomeData = (req, res) => {
  res.render('index.ejs');
};

module.exports.createPDF = async (req, res) => {
  try {
    const postcode = req.body.code;
    await scrapper.scrapeRealtor(postcode);
    res.render('getPDF.ejs');
  } catch (err) {
    console.log('Something went wrong');
    console.error(err);
    res.sendStatus(500).send(err);
  }
};


module.exports.getDatafromPDF = async (req, res) => {
  try {
    const response = await readPDF.readPDF(constants.root);
    res.json(response);
  } catch (err) {
    console.log('Something went wrong');
    console.error(err);
    res.sendStatus(500).send(err);
  }
};
