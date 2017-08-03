'use strict';

const hapi = require('hapi');
const inert = require('inert');
const server = new hapi.Server();
const githubHandler = require('./handlers/github');
const hapiGithub = require('hapi-auth-github');
const githubApi = require('./githubApi');

server.connection({
  host: process.env.HOST,
  port: Number(process.env.PORT)
});

server.register(inert, () => {});

server.register([{
  register: hapiGithub,
  options: {
    handler: githubHandler,
    SCOPE: 'repo'
  }
}], (err) => { if(err) throw err; });

server.register(require('vision'), (err) => {
  server.views({
    engines: {
      html: require('ejs')
    },
    relativeTo: __dirname,
    path: 'public',
    isCached: false
  });
});

server.route({
  method: 'GET',
  path: '/{filename*}',
  handler: {
    directory: {
      path: `${__dirname}/public`,
      listing: false,
      index: false
    }
  }
});

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
  path: '/repo',
  handler: async (req, reply) => {
    reply.view('index', {title: 'test'});
  }
});

server.route({
  method: 'GET',
  path: '/repos',
  handler: async (req, reply) => {
    let commits = await githubApi.getAllRepos();
    reply(commits);
  }
});

server.start((err) => {
  if(err) throw err;

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
