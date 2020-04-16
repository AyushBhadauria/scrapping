const rp = require('request');

module.exports.get = (url, proxy = null, headers = null) => new Promise((resolve, reject) => {
  const req = rp.defaults({
    jar: true, // save cookies to jar
    rejectUnauthorized: false,
    followAllRedirects: true, // allow redirections
  });
  req({
    method: 'GET',
    url,
    proxy,
    headers,
  }, (error, response, body) => {
    if (error) {
      reject(error);
    } else {
      resolve({
        response,
        body,
      });
    }
  });
});


// eslint-disable-next-line max-len
module.exports.post = (url, form, proxy = null, headers = null) => new Promise((resolve, reject) => {
  const req = rp.defaults({
    jar: true, // save cookies to jar
    rejectUnauthorized: false,
    followAllRedirects: true, // allow redirections
  });
  req({
    method: 'POST',
    url,
    proxy,
    form,
    headers,
  }, (error, response, body) => {
    if (error) {
      reject(error);
    } else {
      resolve({
        response,
        body,
      });
    }
  });
});
