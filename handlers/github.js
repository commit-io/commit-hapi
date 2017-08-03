'use strict';

const jwt = require('jsonwebtoken');
const models = require('../models');
const githubApi = require('../githubApi');

module.exports = async function githubHandler(request, reply, tokens, profile) {
  if(profile) {
    console.log(profile)
    // extract the relevant data from Profile to store in jwt object
    let session = {
      fistname: profile.name, // the person's name e.g: Anita
      image: profile.avatar_url, // profile image url
      id: profile.id, // their github id
      agent: request.headers['user-agent'],
      token: tokens.access_token
    };
      // create a jwt to set as the cookie:
    let token = jwt.sign(session, process.env.JWT_SECRET);
    profile.token = token;

    await models.insertUser(profile);
    githubApi.authenticate(tokens.access_token);

    // reply to client with a view
    return reply.redirect('/commits')
      .state('token', token); // see: http://hapijs.com/tutorials/cookies
  } else {
    return reply("Sorry, something went wrong, please try again.").code(401);
  }
}
