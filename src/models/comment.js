const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const Project = require("./project");
const Task = require("./task");
const User = require("./user");

const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Project.hasMany(Comment, {
  foreignKey: "projectId",
});
Comment.belongsTo(Project, {
  foreignKey: "projectId",
});

Task.hasMany(Comment, {
  foreignKey: "taskId",
});
Comment.belongsTo(Task, {
  foreignKey: "taskId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = Comment;
