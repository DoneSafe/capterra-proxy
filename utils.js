const { omit } = require('lodash');

const utils = {
  cleanData: (data, query = {}) => {
    const exclude = query._exclude ? (Array.isArray(query._exclude) ? query._exclude : query._exclude.split(',')) : [];
    if (!exclude || !exclude.length) {
      return data;
    }
    return data.map(r => omit(r, exclude));
  }
};

module.exports = utils;
