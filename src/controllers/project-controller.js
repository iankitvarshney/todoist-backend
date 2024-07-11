const { Op } = require("sequelize");

const Project = require("../models/project");
const Task = require("../models/task");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const filterArray = [];

    if (req.query.parentId) {
      filterArray.push({ parentId: req.query.parentId });
    }

    const projects = await Project.findAll({
      where: { [Op.and]: filterArray },
    });

    SuccessResponse.message = "Successfully fetched all projects";
    SuccessResponse.data = projects;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all projects";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.findAll({
      where: { projectId: req.params.id },
    });

    SuccessResponse.message = "Successfully fetched all tasks of a project";
    SuccessResponse.data = tasks;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching all tasks of a project";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function get(req, res) {
  try {
    const project = await Project.findByPk(req.params.id);

    if (project === null) {
      SuccessResponse.message = `No project is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully fetched a project";
    SuccessResponse.data = project;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching a project";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function create(req, res) {
  try {
    const project = await Project.create({
      name: req.body.name,
      color: req.body.color,
      order: req.body.order,
      isFavorite: req.body.isFavorite,
      isInboxProject: req.body.isInboxProject,
      viewStyle: req.body.viewStyle,
      url: req.body.url,
      userId: req.body.userId,
      parentId: req.body.parentId,
    });

    SuccessResponse.message = "Successfully created a project";
    SuccessResponse.data = project;

    return res.status(201).json(SuccessResponse);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      ErrorResponse.message = error.errors[0].message;
      ErrorResponse.error = error;

      return res.status(400).json(ErrorResponse);
    }

    if (error.name === "SequelizeDatabaseError") {
      ErrorResponse.message = "Some parameter value is not correct";
      ErrorResponse.error = error;

      return res.status(400).json(ErrorResponse);
    }

    ErrorResponse.message = "Something went wrong while creating a project";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function update(req, res) {
  try {
    const response = await Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (response[0] === 0) {
      SuccessResponse.message = `No project is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    const project = await Project.findByPk(req.params.id);

    SuccessResponse.message = "Successfully updated a project";
    SuccessResponse.data = project;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      ErrorResponse.message = error.errors[0].message;
      ErrorResponse.error = error;

      return res.status(400).json(ErrorResponse);
    }

    if (error.name === "SequelizeDatabaseError") {
      ErrorResponse.message = "Some parameter value is not correct";
      ErrorResponse.error = error;

      return res.status(400).json(ErrorResponse);
    }

    ErrorResponse.message = "Something went wrong while updating a project";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function destroy(req, res) {
  try {
    const response = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (response === 0) {
      SuccessResponse.message = `No project is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully destroyed a project";
    SuccessResponse.data = {};

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while destroying a project";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  getAll,
  getAllTasks,
  get,
  create,
  update,
  destroy,
};
