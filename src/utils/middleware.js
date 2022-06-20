var jwt = require("jsonwebtoken");
const multer = require("multer");

const { User } = require("../apps/account/models/User");

module.exports.authorization = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const verify = new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, data) => {
        if (err) return reject(err);
        const user = await User.findOne({
          where: { id: data.id, mobile: data.mobile },
        });
        resolve(user);
      }
    );
  });
  await verify
    .then((user) => (req.user = user))
    .catch((err) => res.sendStatus(403));
  next();
};

module.exports.multerError = async (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
};
