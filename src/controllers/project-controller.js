const Project = require("../models/project");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const projects = await Project.findAll();

    SuccessResponse.message = "Successfully fetched all projects";
    SuccessResponse.data = projects;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all projects";
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

    if (Object.keys(req.body).length === 0) {
      SuccessResponse.message = "Request body should not be empty";
      SuccessResponse.data = {};
      return res.status(400).json(SuccessResponse);
    }

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
  get,
  create,
  update,
  destroy,
};
