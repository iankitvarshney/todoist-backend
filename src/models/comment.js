const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const Project = require("./project");
const Task = require("./task");

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

module.exports = Comment;
