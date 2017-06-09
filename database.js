const githubClient = require('github');

const github = new githubClient({
  debug: false,
  Promise: promise
});

github.authenticate({
  type: "token",
  token: tokens.access_token
});

console.log('123')

try {
  let orgs = await github.users.getOrgs({});
  let repos = await github.repos.getForOrg({
    org: orgs.data[0].login
  });
  // console.log(orgs);
  console.log(repos);
} catch(err) {
  console.log(err);
}
