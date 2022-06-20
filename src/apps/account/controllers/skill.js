const { Skill } = require("../models/Skill");

// Post Skill
module.exports.postSkill = async (req, res, next) => {
  let skill = Skill.build({ ...req.body, user: req.user.id });
  skill = await skill.save();
  res.status(200).json(skill);
  next();
};

// Get Skill By ID
module.exports.getSkill = async (req, res, next) => {
  let skill = await Skill.findByPk(req.query.id);
  res.status(200).json(skill);
  next();
};

// Update Skill
module.exports.updateSkill = async (req, res, next) => {
  await Skill.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  let result = await Skill.findByPk(req.body.id);
  res.status(200).json(result);
};

// Get All Users
module.exports.filterSkill = async (req, res, next) => {
  let skill = await Skill.findAll();
  res.status(200).json(skill);
  next();
};

// Delete Skill
module.exports.deleteSkill = async (req, res, next) => {
  let skill = await Skill.findByPk(req.query.id);
  let result = await skill.destroy();
  res.status(200).json(result);
  next();
};
