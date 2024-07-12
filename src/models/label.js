const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const User = require("../models/user");

const Label = sequelize.define("Label", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: "charcoal",
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Label, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Label.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = Label;
