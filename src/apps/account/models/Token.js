const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../../utils/database");

module.exports.Token = sequelize.define("token", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  access: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  refresh: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
