'use strict';

const server = require('../../server');
const githubHandler = require('./handlers/github');
const hapiGithub = require('hapi-auth-github');

function initialize() {
  server.register([{
    register: hapiGithub,
    options: {
      handler: githubHandler,
      SCOPE: 'repo'
    }
  }], (err) => { if(err) throw err; });
}

module.exports = {
  initialize
};
