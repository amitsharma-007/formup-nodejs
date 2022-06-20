const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
require("./src/utils/aws");

const { sequelize } = require("./src/utils/database");
const { User } = require("./src/apps/account/models/User");
const { Token } = require("./src/apps/account/models/Token");
const { Address } = require("./src/apps/account/models/Address");
const { Education } = require("./src/apps/account/models/Education");
const { Experience } = require("./src/apps/account/models/Experience");
const { Skill } = require("./src/apps/account/models/Skill");

// App
const app = express();
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "build")));

// Cors
app.use(cors());

// Database
sequelize.sync({ force: true }).then(() => console.log("Sync Done! "));
User.hasOne(Token, { foreignKey: "user" });
User.hasMany(Address, { foreignKey: "user" });
User.hasMany(Education, { foreignKey: "user" });
User.hasMany(Experience, { foreignKey: "user" });
User.hasMany(Skill, { foreignKey: "user" });

// Multer
app.use(require("./src/utils/middleware").multerError);

// Frontend
app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  next();
});

// Routes
app.use("/account", require("./src/apps/account/routers/user"));
app.use("/account", require("./src/apps/account/routers/address"));
app.use("/account", require("./src/apps/account/routers/education"));
app.use("/account", require("./src/apps/account/routers/experience"));
app.use("/account", require("./src/apps/account/routers/skill"));
app.use("/token", require("./src/apps/account/routers/token"));

// Server
app.listen(process.env.PORT || 3000, () =>
  console.log("Server is On on port :3000")
);
