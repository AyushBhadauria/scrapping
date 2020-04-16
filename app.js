const express = require('express');

const app = express();
const port = 3000;

const scrapper = require('./scripts/webScrapper');
const readPDF = require('./scripts/readPDF');
const constants = require('./scripts/constants');


app.get('/:code', async (req, res) => {
  try {
    const postcode = req.params.code;

    await scrapper.scrapeRealtor(postcode);
    const response = await readPDF.readPDF(constants.UPLOAD_DIRECTORY);

    res.json(response);
  } catch (err) {
    console.log('Something went wrong');
    console.error(err);
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
