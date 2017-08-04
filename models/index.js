const mongo = require('mongodb');
const promise = require('bluebird');

promise.promisifyAll(mongo);

const insertUser = async (user) => {
  try {
    let db = await mongo.MongoClient.connectAsync(process.env.MONGO_HOST);
    const users = db.collection('users');
    let result = await users.insertAsync(user);
    db.close();
  } catch(err) {
    console.log(err);
  }
};

const insertRepo = async (repo) => {
  try {
    let db = await mongo.MongoClient.connectAsync(process.env.MONGO_HOST);
    const repos = db.collection('repos');
    let result = await repos.insertAsync(repo);
    db.close();
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  insertUser,
  insertRepo
};
