module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("payment", {
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
  return Payment;
};
