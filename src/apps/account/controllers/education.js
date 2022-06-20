const { Education } = require("../models/Education");

// Post Education
module.exports.postEducation = async (req, res, next) => {
  let education = Education.build({ ...req.body, user: req.user.id });
  education = await education.save();
  res.status(200).json(education);
  next();
};

// Get Education By ID
module.exports.getEducation = async (req, res, next) => {
  let education = await Education.findByPk(req.query.id);
  res.status(200).json(education);
  next();
};

// Update Education
module.exports.updateEducation = async (req, res, next) => {
  await Education.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  let result = await Education.findByPk(req.body.id);
  res.status(200).json(result);
};

// Get All Users
module.exports.filterEducation = async (req, res, next) => {
  let education = await Education.findAll();
  res.status(200).json(education);
  next();
};

// Delete Education
module.exports.deleteEducation = async (req, res, next) => {
  let education = await Education.findByPk(req.query.id);
  let result = await education.destroy();
  res.status(200).json(result);
  next();
};
