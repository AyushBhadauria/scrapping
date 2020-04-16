const rp = require('request');
const rpp = require('request-promise');

module.exports.get = (url, proxy = null, headers = null) => new Promise((resolve, reject) => {
  const req = rp.defaults({
    jar: true, // save cookies to jar
    rejectUnauthorized: false,
    followAllRedirects: true, // allow redirections
  });
  let options = {
    method: 'GET',
    url,
  };

  if (proxy) {
    options = {
      ...options,
      proxy,
    };
  }
  if (headers) {
    options = {
      ...options,
      headers,
    };
  }
  req(options, (error, response, body) => {
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

module.exports.getPromise = (url, proxy, headers) => new Promise((resolve, reject) => {
  const req = rpp.defaults({
    jar: true, // save cookies to jar
    rejectUnauthorized: false,
    followAllRedirects: true, // allow redirections
  });
  const options = {
    method: 'GET',
    url,
    encoding: null,
    proxy,
    headers,
  };
  console.log('Get Promise request', options);
  req(options).then((body) => {
    resolve(body);
  }).catch((err) => {
    reject(err);
  });
});


// eslint-disable-next-line max-len
module.exports.post = (url, form, proxy = null, headers = null) => new Promise((resolve, reject) => {
  const req = rp.defaults({
    jar: true, // save cookies to jar
    rejectUnauthorized: false,
    followAllRedirects: true, // allow redirections
  });

  let options = {
    method: 'POST',
    url,
    form,
  };

  if (proxy) {
    options = {
      ...options,
      proxy,
    };
  }
  if (headers) {
    options = {
      ...options,
      headers,
    };
  }
  req(options, (error, response, body) => {
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

module.exports.postPromise = (url, form, headers) => new Promise((resolve, reject) => {
  const req = rpp.defaults({
    jar: true, // save cookies to jar
    rejectUnauthorized: false,
    followAllRedirects: true, // allow redirections
  });
  const options = {
    method: 'POST',
    url,
    form,
    headers,
  };
  console.log('post Promise request', options);
  req(options).then((body) => {
    resolve(body);
  }).catch((err) => {
    reject(err);
  });
});
