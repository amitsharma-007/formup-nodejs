module.exports = (sequelize, DataTypes) => {
  const Razorpay = sequelize.define("razorpay", {
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
  return Razorpay;
};
