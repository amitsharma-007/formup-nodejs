module.exports = (sequelize, DataTypes) => {
  const Slide = sequelize.define("slide", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Slide;
};
