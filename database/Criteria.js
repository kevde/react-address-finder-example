'use strict';
const _ = require('lodash');

class Criteria {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.or = { likes: {} };
  }

  withDocument(document) {
    this.document = document;
    return this;
  }

  withSearchAny(text, fieldNames) {
    _.each(fieldNames, (fieldName) => _.set(this, `or.likes.${fieldName}`, text));
    return this;
  }
}

module.exports = Criteria;