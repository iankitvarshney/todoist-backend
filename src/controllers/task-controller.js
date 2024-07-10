const { Op } = require("sequelize");

const Task = require("../models/task");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const filterArray = [];

    if (req.query.projectId) {
      filterArray.push({
        projectId: req.query.projectId,
      });
    }
    if (req.query.sectionId) {
      filterArray.push({
        sectionId: req.query.sectionId,
      });
    }

    const tasks = await Task.findAll({
      where: {
        [Op.and]: filterArray,
      },
    });

    SuccessResponse.message = "Successfully fetched all tasks";
    SuccessResponse.data = tasks;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all tasks";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  getAll,
};
