const cheerio = require('cheerio');
const fs = require('fs');

const request = require('./request');
const constants = require('./constants');

const getPdfData = (element, cookie) => {
  let id = '';
  const dlinkList = [];
  const str = element.pdflink;
  id = str.substring(str.indexOf('=') + 1, str.length);
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const reqest5Headers = constants.getRequest5Headers(cookie);
    await request.get(element.pdflink, null, reqest5Headers);

    const request6Headers = constants.getRequest6Headers(cookie);
    const request6Form = { address: (element.title).trim(), id, honeypot: '' };
    const { response: response6 } = await request.post(element.pdflink,
      request6Form, null, request6Headers);

    const $ = cheerio.load(response6);
    $('#maincontent table tr:nth-child(2) td').each(async (i, elem) => {
      const linktemp = $(elem).find('a').attr('href');
      dlinkList.push({
        title: $(elem).text(),
        downlink: constants.SCRAPPING_URL + linktemp,
      });

      const { response: response7 } = await request.get(dlinkList[0].downlink,
        constants.PROXY_URL, constants.REQUEST_7_HEADERS);
      const fileName = `uploads/${(element.title).trim()}.pdf`;
      const buffer = Buffer.from(response7, 'utf8');
      fs.writeFileSync(fileName, buffer);
      resolve();
    });
  });
};

// eslint-disable-next-line no-async-promise-executor
module.exports.scrapeRealtor = (postcode) => new Promise(async (resolve, reject) => {
  const linkList = [];
  let cookie1 = '';
  let cookie2 = '';
  let cookie3 = '';
  try {
    // request 1
    const { response: response1 } = await request.get(constants.SCRAPPING_URL, constants.PROXY_URL);
    cookie1 = response1.headers['set-cookie'];
    cookie1 = String(cookie1).substring(69, 112);

    // request 2
    const request2Headers = { Cookie: cookie1 };
    const { response: response2 } = await request.get(constants.REQUEST_2_URL,
      constants.PROXY_URL, request2Headers);
    cookie2 = response2.headers['set-cookie'];
    cookie2 = String(cookie2).substring(0, 43);

    // request 3
    const request3Headers = constants.getRequest3Headers(cookie2);
    const { response: response3 } = await request.post(constants.REQUEST_3_URL,
      constants.REQUEST_3_FORM, constants.PROXY_URL, request3Headers);
    cookie3 = response3.headers['set-cookie'];
    cookie3 = String(cookie3).substring(0, 43);

    // request 4
    const request4Headers = constants.getRequest4Headers(cookie3);
    const request4Form = { postcode, id: 'id=22fe93f5601f68e4' };
    const { body } = await request.post(constants.REQUEST_3_URL,
      request4Form, null, request4Headers);

    const $ = cheerio.load(body);
    $('#maincontent table tr td').each((i, elem) => {
      const linkk = $(elem).find('a').attr('href');
      linkList.push({
        title: $(elem).text(),
        pdflink: constants.SCRAPPING_URL + linkk,
      });
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const element of linkList) {
      // eslint-disable-next-line no-await-in-loop
      await getPdfData(element, cookie3);
    }
    resolve();
  } catch (err) {
    console.log('Error Occured while scarping');
    console.log(err);
    reject(err);
  }
});
