'use strict';
const GraphQL = require('graphql');

module.exports = new GraphQL.GraphQLObjectType({
  name: 'RealProperty',
  description: 'A physical area where which can be owned by a person',
  fields: () => ({
    id: {
      type: (GraphQL.GraphQLString),
      description: 'The id of the of the real property',
    },
    street: {
      type: GraphQL.GraphQLString,
      description: 'The street where the real property located',
    },
    city: {
      type: GraphQL.GraphQLString,
      description: 'The city where the real property located',
    },
    state: {
      type: GraphQL.GraphQLString,
      description: 'The state where the real property located',
    },
    zip: {
      type: GraphQL.GraphQLString,
      description: 'The zip where the real property located',
    },
    rent: {
      type: GraphQL.GraphQLInt,
      description: 'The rent number where the real property is tagged',
    },
  })
});