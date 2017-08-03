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

const getOrgRepos = async () => {
  try {
    let orgs = await github.users.getOrgs({});

    let orgRepos = await Promise.all(orgs.data.map(async (org) => {
      return (await github.repos.getForOrg({
        org: org.login
      })).data.map(orgRepos => orgRepos);
    }));

    return orgRepos;
  } catch(err) {
    console.log(err);
  }
};

const getAllRepos = async () => {
  try {
    let repos = await github.repos.getAll({});
    return repos;
  } catch(err) {
    console.log(err);
  }
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
    let commits = await github.repos.getCommits(obj);
    return commits;
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  authenticate,
  getCommits,
  getAllRepos,
  getOrgRepos
};
