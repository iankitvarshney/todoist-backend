const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const User = require("./user");

const Project = sequelize.define("Project", {
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
  commentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isInboxProject: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  viewStyle: {
    type: DataTypes.STRING,
    defaultValue: "list",
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Project.hasMany(Project, {
  foreignKey: "parentId",
});
Project.belongsTo(Project, {
  foreignKey: "parentId",
});

User.hasMany(Project, {
  foreignKey: "userId",
});
Project.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = Project;
