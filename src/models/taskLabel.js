const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const Task = require("./task");
const Label = require("./label");

const TaskLabels = sequelize.define("TaskLabels", {
  TaskId: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: "id",
    },
  },
  LabelId: {
    type: DataTypes.INTEGER,
    references: {
      model: Label,
      key: "id",
    },
  },
});

Task.belongsToMany(Label, { through: TaskLabels });
Label.belongsToMany(Task, { through: TaskLabels });

module.exports = TaskLabels;
