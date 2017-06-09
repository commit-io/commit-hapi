'use strict';

const promise = require('bluebird');
const mongo = require('mongodb');
const jwt = require('jsonwebtoken');

promise.promisifyAll(mongo);

module.exports = async function githubHandler(request, reply, tokens, profile) {
  if(profile) {
    console.log(profile)
    // extract the relevant data from Profile to store in jwt object
    let session = {
      fistname: profile.name, // the person's name e.g: Anita
      image: profile.avatar_url, // profile image url
      id: profile.id, // their github id
      agent: request.headers['user-agent']
    }
      // create a jwt to set as the cookie:
    let token = jwt.sign(session, process.env.JWT_SECRET);
    // store the Profile and Oauth tokens in the Redis DB using G+ id as key
    // Detailed Example...? https://github.com/dwyl/hapi-auth-google/issues/2
    // let db = await mongo.MongoClient.connectAsync(process.env.MONGO_HOST);

    // reply to client with a view
    return reply("Hello " + profile.name + ", You Logged in Using GitHub!")
      .state('token', token); // see: http://hapijs.com/tutorials/cookies
  } else {
    return reply("Sorry, something went wrong, please try again.").code(401);
  }
}
