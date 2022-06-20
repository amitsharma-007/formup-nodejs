const { Address } = require("../models/Address");

// Post Address
module.exports.postAddress = async (req, res, next) => {
  let data = req.body;
  let address = Address.build({ ...req.body, user: req.user.id });
  address = await address.save();
  res.status(200).json(address);
  next();
};

// Get Address By ID
module.exports.getAddress = async (req, res, next) => {
  let address = await Address.findByPk(req.query.id);
  res.status(200).json(address);
  next();
};

// Update Address
module.exports.updateAddress = async (req, res, next) => {
  await Address.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  let result = await Address.findByPk(req.body.id);
  res.status(200).json(result);
};

// Get All Users
module.exports.filterAddress = async (req, res, next) => {
  let address = await Address.findAll();
  res.status(200).json(address);
  next();
};

// Delete Address
module.exports.deleteAddress = async (req, res, next) => {
  let address = await Address.findByPk(req.query.id);
  let result = await address.destroy();
  res.status(200).json(result);
  next();
};
