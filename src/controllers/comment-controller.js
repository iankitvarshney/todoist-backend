const { Op } = require("sequelize");

const Comment = require("../models/comment");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const filterArray = [];

    if (req.query.projectId) {
      filterArray.push({
        projectId: req.query.projectId,
      });
    }
    if (req.query.taskId) {
      filterArray.push({
        taskId: req.query.taskId,
      });
    }

    const comments = await Comment.findAll({
      where: {
        [Op.and]: filterArray,
      },
    });

    SuccessResponse.message = "Successfully fetched all comments";
    SuccessResponse.data = comments;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all comments";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function create(req, res) {
  try {
    const comment = await Comment.create(req.body);

    SuccessResponse.message = "Successfully created a comment";
    SuccessResponse.data = comment;

    return res.status(201).json(SuccessResponse);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      ErrorResponse.message = "Some parameter value is not correct";
      ErrorResponse.error = error;

      return res.status(400).json(ErrorResponse);
    }

    ErrorResponse.message = "Something went wrong while creating a comment";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  getAll,
  create,
};
