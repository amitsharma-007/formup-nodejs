var jwt = require("jsonwebtoken");
const { S3 } = require("aws-sdk");
const s3 = new S3();

const { User } = require("../models/User");
const { s3Uploadv1 } = require("../../../utils/upload");

// Post User
module.exports.postUser = async (req, res, next) => {
  let data = req.body;
  let user = User.build(data);
  user = await user.save();
  res.status(200).json(user);
  next();
};

// Get User By ID
module.exports.getUser = async (req, res, next) => {
  let user = await User.findByPk(req.query.id);
  res.status(200).json(user);
  next();
};

// Update User
module.exports.updateUser = async (req, res, next) => {
  await User.update(req.body, {
    where: {
      id: req.body.id,
    },
  });
  let result = await User.findByPk(req.body.id);
  res.status(200).json(result);
};

// Update Avatar
module.exports.updateAvatar = async (req, res, next) => {
  try {
    const avatar = await s3Uploadv1({
      folder: "avatar",
      file: req.file,
    });

    let user = await User.findByPk(req.body.id);
    if (user.avatar !== null) {
      const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: user.avatar.split(".amazonaws.com/")[1],
      };
      s3.deleteObject(param, async (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          user.avatar = avatar.Location;
          let result = await user.save();
          res.status(200).json(result);
        }
      });
    } else {
      user.avatar = avatar.Location;
      let result = await user.save();
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update Cover
module.exports.updateCover = async (req, res, next) => {
  try {
    const cover = await s3Uploadv1({
      folder: "cover",
      file: req.file,
    });

    let user = await User.findByPk(req.body.id);
    if (user.cover !== null) {
      const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: user.cover.split(".amazonaws.com/")[1],
      };
      s3.deleteObject(param, async (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          user.cover = cover.Location;
          let result = await user.save();
          res.status(200).json(result);
        }
      });
    } else {
      user.cover = cover.Location;
      let result = await user.save();
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get All Users
module.exports.filterUsers = async (req, res, next) => {
  let user = await User.findAll();
  res.status(200).json(user);
  next();
};

// Delete User
module.exports.deleteUser = async (req, res, next) => {
  let user = await User.findByPk(req.query.id);
  let result = await user.destroy();
  res.status(200).json(result);
  next();
};
