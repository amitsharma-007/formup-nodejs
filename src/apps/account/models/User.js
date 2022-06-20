const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../utils/database");

module.exports.User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  latitude: {
    type: DataTypes.FLOAT(10, 6),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT(10, 6),
    allowNull: true,
  },
});
