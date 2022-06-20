var jwt = require("jsonwebtoken");
const { totp } = require("otplib");
const { message } = require("../../../utils/messaging");
const { Token } = require("../models/Token");
const { User } = require("../models/User");

totp.options = { digits: 6, step: 300 };

module.exports.request = async (req, res, next) => {
  let data = req.body;
  const otp = totp.generate(`${process.env.OTP_SECRET_KEY}${data.mobile}`);
  await message({
    to: data.mobile,
    body: `Enter the OTP: ${otp} to verify your account at FormUp. Note that the OTP expires in 5 minutes.`,
  })
    .then((message) => {
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => res.status(400).json({ message: "Failed!" }));
  next();
};

module.exports.verify = async (req, res, next) => {
  const isValid = totp.verify({
    token: req.body.otp,
    secret: `${process.env.OTP_SECRET_KEY}${req.body.mobile}`,
  });
  if (!isValid) {
    res.status(401).json({ message: "Invalid OTP!" });
  } else {
    let user = await User.findOne({ where: { mobile: req.body.mobile } });
    if (!user) {
      let newUser = User.build({ mobile: req.body.mobile });
      newUser = await newUser.save();

      let access = jwt.sign(
        {
          id: newUser.id,
          mobile: newUser.mobile,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30d" }
      );
      let refresh = jwt.sign(
        {
          id: newUser.id,
          mobile: newUser.mobile,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      let token = Token.build({
        access: access,
        refresh: refresh,
        user: newUser.id,
      });
      token = await token.save();
      res.status(200).json({ access: token.access, refresh: token.refresh });
    } else {
      let access = jwt.sign(
        {
          id: user.id,
          mobile: user.mobile,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "30d" }
      );

      let token = await Token.findOne({
        where: {
          user: user.id,
        },
      });
      token.access = access;
      token = await token.save();
      res.status(200).json({ access: token.access, refresh: token.refresh });
    }
  }
  next();
};

module.exports.refresh = async (req, res, next) => {
  const data = req.body;
  const verify = new Promise((resolve, reject) => {
    jwt.verify(
      data.refresh,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, data) => {
        if (err) return reject(err);
        const user = await User.findOne({
          where: { id: data.id, mobile: data.mobile },
        });
        let access = jwt.sign(
          {
            id: user.id,
            mobile: user.mobile,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "30d" }
        );
        let token = await Token.findOne({
          where: {
            user: user.id,
          },
        });
        token.access = access;
        token = await token.save();
        resolve(token);
      }
    );
  });
  await verify
    .then((token) =>
      res.status(200).json({ access: token.access, refresh: token.refresh })
    )
    .catch((err) => res.sendStatus(403));
  next();
};
