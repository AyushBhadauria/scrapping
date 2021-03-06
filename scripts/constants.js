const path = require('path');

const mainUrl = 'https://www.epcregister.com/';
const uploadFolderName = 'uploads';
module.exports = {
  root: path.join(__dirname, `../${uploadFolderName}`),
  UPLOAD_DIRECTORY: uploadFolderName,
  TOTAL_AREA_KEY: 'Total floor area',
  SCRAPPING_URL: mainUrl,
  PROXY_URL: 'http://scraperapi:bff17b39c9e0e9982159c780741de6dc@proxy-server.scraperapi.com:8001',
  REQUEST_2_URL: `${mainUrl}reportSearchAddressByPostcode.html`,
  REQUEST_3_URL: `${mainUrl}reportSearchAddressTerms.html`,
  REQUEST_3_FORM: { accept: 'Accept Terms', redirectPage: 'reportSearchAddressByPostcode' },
  getRequest3Headers: (cookie) => ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36', // optional headers
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: cookie,
  }),
  REQUEST_4_URL: `${mainUrl}reportSearchAddressByPostcode.html`,
  REQUEST_6_URL: `${mainUrl}reportSearchAddressSelectAddress.html`,
  getRequest4Headers: (cookie) => ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36', // optional headers
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: `site-text-size=medium; address-search-terms=Y;${cookie}`,
  }),
  getRequest5Headers: (cookie) => ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36', // optional headers
    'Content-Type': 'text/html',
    Cookie: `site-text-size=medium; address-search-terms=Y;${cookie}`,
    Accept: 'text/html,application/xhtml+xml,application/xml',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Dest': 'document',
  }),
  getRequest6Headers: (cookie) => ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36', // optional headers
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: `site-text-size=medium; address-search-terms=Y;${cookie}`,
  }),
  REQUEST_7_HEADERS: { Accept: 'application/octet-stream', 'Content-type': 'application/octet-stream' },
};
