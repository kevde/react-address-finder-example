'use strict';
const _ = require('lodash');
const path = require('path');
const NoSQL = require('nosql');
const Q = require('q');

class Database {
  constructor(directory) {
    this.directory = directory;
  }

  connect(collectionName) {
    const sqlTablePath = path.resolve(this.directory, `${collectionName}.nosql`);
    return NoSQL.load(sqlTablePath);
  }

  query(criteria) {
    const connection = this.connect(criteria.collectionName);
    const deferred = Q.defer();
    connection.find().make((builder) => {
      _.each(criteria.or.likes, (text, fieldName) => builder.or().like(fieldName, text));
      builder.callback((err, response) => (err) ? deferred.reject(err) : deferred.resolve(response))
    });
    return deferred.promise;
  }

  save(criteria) {
    const connection = this.connect(criteria.collectionName);
    const deferred = Q.defer();
    connection.insert(criteria.document).callback((err) => (err) ? deferred.reject(err) : deferred.resolve(entityObject));
    return deferred.promise;
  }
}

module.exports = Database;