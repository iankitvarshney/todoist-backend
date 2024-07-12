const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const Project = require("./project");
const Section = require("./section");
const User = require("./user");

const Task = sequelize.define("Task", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  due: {
    type: DataTypes.DATE,
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
  },
  commentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Task.hasMany(Task, {
  foreignKey: "parentId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Task.belongsTo(Task, {
  foreignKey: "parentId",
});

Project.hasMany(Task, {
  foreignKey: "projectId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Task.belongsTo(Project, {
  foreignKey: "projectId",
});

Section.hasMany(Task, {
  foreignKey: "sectionId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Task.belongsTo(Section, {
  foreignKey: "sectionId",
});

User.hasMany(Task, {
  foreignKey: "creatorId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Task.belongsTo(User, {
  foreignKey: "creatorId",
});

module.exports = Task;
