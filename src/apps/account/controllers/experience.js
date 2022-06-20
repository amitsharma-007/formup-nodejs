const { Experience } = require("../models/Experience");

// Post Experience
module.exports.postExperience = async (req, res, next) => {
  let experience = Experience.build({ ...req.body, user: req.user.id });
  experience = await experience.save();
  res.status(200).json(experience);
  next();
};

// Get Experience By ID
module.exports.getExperience = async (req, res, next) => {
  let experience = await Experience.findByPk(req.query.id);
  res.status(200).json(experience);
  next();
};

// Update Experience
module.exports.updateExperience = async (req, res, next) => {
  await Experience.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  let result = await Experience.findByPk(req.body.id);
  res.status(200).json(result);
};

// Get All Users
module.exports.filterExperience = async (req, res, next) => {
  let experience = await Experience.findAll();
  res.status(200).json(experience);
  next();
};

// Delete Experience
module.exports.deleteExperience = async (req, res, next) => {
  let experience = await Experience.findByPk(req.query.id);
  let result = await experience.destroy();
  res.status(200).json(result);
  next();
};
