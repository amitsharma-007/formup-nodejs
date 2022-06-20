const { Sequelize } = require("sequelize");

module.exports.sequelize = new Sequelize("formup", "master", "master2022", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
});
