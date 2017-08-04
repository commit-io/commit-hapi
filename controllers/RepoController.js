const models = require('../models');

exports.insertRepo = async (req, reply) => {
  console.log(req.payload);
  let result = await models.insertRepo(req.payload);
  return result;
};
