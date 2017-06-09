'use strict';

const hapi = require('hapi');
const server = new hapi.Server();

server.connection({
  host: process.env.HOST,
  port: Number(process.env.PORT)
});

server.start((err) => {
  if(err) throw err;

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
