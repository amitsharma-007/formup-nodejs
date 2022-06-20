const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../utils/database");

module.exports.Address = sequelize.define("address", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  house: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  locality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landmark: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
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
