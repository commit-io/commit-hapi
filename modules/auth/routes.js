server.register([{
  register: hapiGithub,
  options: {
    handler: githubHandler,
    SCOPE: 'repo'
  }
}], (err) => { if(err) throw err; });
