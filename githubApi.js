const githubClient = require('github');
const promise = require('bluebird');
const moment = require('moment');

const github = new githubClient({
  debug: false,
  Promise: promise
});

const authenticate = (token) => {
  github.authenticate({
    type: "token",
    token
  });
};

const getCommits = async () => {
  try {
    let orgs = await github.users.getOrgs({});
    let repos = await github.repos.getForOrg({
      org: orgs.data[0].login
    });

    let obj = {
      owner: repos.data[0].owner.login,
      repo: repos.data[2].name,
      since: moment().weekday(-7).format()
    };
    console.log(obj);
    let commits = await github.repos.getCommits(obj);

    console.log(commits);
    // console.log(moment().weekday(-7).format());
    // // console.log(orgs);
    // console.log(repos.data[0].owner);
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  authenticate,
  getCommits
};
