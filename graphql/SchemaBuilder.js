'use strict';
const _ = require('lodash');
const Criteria = require('../database/Criteria');
const RealPropertyType = require('./RealPropertyType');
const GraphQL = require('graphql');

class SchemaBuilder {
  constructor(database, fields = {}) {
    this.database = database;
    this.fields = fields;
  }

  withPropertyField() {
    const propertyCriteria = new Criteria('properties');
    const fieldNames = _.keys(RealPropertyType.getFields());
    return _.set(this, 'fields.getProperties', {
      args: { text: { name: 'text', type: GraphQL.GraphQLString } },
      type: new GraphQL.GraphQLList(RealPropertyType),
      resolve: (root, args) => this.database.query(propertyCriteria.withSearchAny(args.text || '', fieldNames))
    });
  }

  build() {
    return new GraphQL.GraphQLSchema({ query: this.createRootType() });
  }

  createRootType() {
    return new GraphQL.GraphQLObjectType({ name: 'RootQueryType', fields: this.fields });
  }
}

module.exports = SchemaBuilder;