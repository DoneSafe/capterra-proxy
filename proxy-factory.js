const rp = require('request-promise');
const utils = require('./utils');

const makeRequest = (key, qs = {}, headers = {}, acc = []) => {
  const options = {
    method: 'GET',
    json: true,
    url: `https://public-api.capterra.com/v1/${key}`,
    qs,
    headers,
  };
  return rp(options).then(body => {
    const data = utils.cleanData(body.data, qs);
    if (!data.length) {
      return {
        data: acc,
        total: body.total
      };
    } else {
      return makeRequest(key, { ...qs, scroll_id: body.scroll_id }, headers, [...acc, ...data]);
    }
  });
};

const proxyFactory = (key) => {
  return function (req, res, next) {
    const headers = { 'Authorization': req.headers['authorization'] };
    makeRequest(key, req.query, headers)
      .then((response) => res.json(response))
      .catch((error) => next(error));
  };
};


module.exports = proxyFactory;
