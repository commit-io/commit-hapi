'use strict';

const hapi = require('hapi');
const server = new hapi.Server();
const githubHandler = require('./handlers/github');
const hapiGithub = require('hapi-auth-github');
const githubApi = require('./githubApi');

server.connection({
  host: process.env.HOST,
  port: Number(process.env.PORT)
});

server.start((err) => {
  if(err) throw err;

  console.log(`Server running at: ${server.info.uri}`);
});

server.register([{
  register: hapiGithub,
  options: {
    handler: githubHandler,
    SCOPE: 'repo'
  }
}], (err) => { if(err) throw err; });

server.route({
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
		let url = hapiGithub.login_url();
		let src = 'https://cloud.githubusercontent.com/assets/194400/11214293/4e309bf2-8d38-11e5-8d46-b347b2bd242e.png';
		let btn = '<a href="' + url + '"><img src="' + src + '" alt="Login With GitHub"></a>';
    reply(btn);
  }
});

server.route({
  method: 'GET',
  path: '/commits',
  handler: async (req, reply) => {
    let commits = await githubApi.getCommits();
    console.log(commits);
  }
});

module.exports = server;
