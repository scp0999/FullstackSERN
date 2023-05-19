/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association (relationship among the) here
      Booking.belongsTo(models.User, { foreignKey: "patientId", targetKey: "id", as: "patientData" });

      Booking.belongsTo(models.Allcode, { foreignKey: "timeType", targetKey: "keyMap", as: "timeTypeDataPatient" });

    }
  }
  Booking.init(
    {
      statusId: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.BOOLEAN,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
