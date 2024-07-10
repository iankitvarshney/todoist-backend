const { DataTypes } = require("sequelize");

const sequelize = require("../config/config");
const Project = require("./project");

const Section = sequelize.define("Section", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

Project.hasMany(Section, {
  foreignKey: "projectId",
});
Section.belongsTo(Project, {
  foreignKey: "projectId",
});

module.exports = Section;
