'use strict';
const path = require('path');
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const Database = require('./database/Database');
const SchemaBuilder = require('./graphql/SchemaBuilder');

const HTTP_PORT = 3000;
const DB_PATH = path.resolve(__dirname, 'resources', 'collections');
const LOADED_SUCCESSFUL = `Successfully loaded the application on port ${HTTP_PORT}`;

const server = express();
const database = new Database(DB_PATH);
const graphqlSchema = new SchemaBuilder(database).withPropertyField().build();

server.use(cors());
server.use('/graphql', graphqlHTTP(req => ({ schema: graphqlSchema, graphiql: true })));
server.listen(HTTP_PORT, () => console.log(LOADED_SUCCESSFUL));