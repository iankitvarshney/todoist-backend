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

async function getAllActive(req, res) {
  try {
    const filterArray = [{ isCompleted: false }];

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

async function get(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task === null) {
      SuccessResponse.message = `No task is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully fetched a task";
    SuccessResponse.data = task;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching a task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function getActive(req, res) {
  try {
    const task = await Task.findOne({
      where: {
        [Op.and]: [{ id: req.params.id }, { isCompleted: false }],
      },
    });

    if (task === null) {
      SuccessResponse.message = `No task is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully fetched a task";
    SuccessResponse.data = task;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching a task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function create(req, res) {
  try {
    const task = await Task.create({
      content: req.body.content,
      description: req.body.description,
      order: req.body.order,
      priority: req.body.priority,
      due: req.body.due,
      url: req.body.url,
      parentId: req.body.parentId,
      projectId: req.body.projectId,
      sectionId: req.body.sectionId,
      creatorId: req.body.creatorId,
    });

    SuccessResponse.message = "Successfully created a task";
    SuccessResponse.data = task;

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

    ErrorResponse.message = "Something went wrong while creating a task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function update(req, res) {
  try {
    const response = await Task.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (response[0] === 0) {
      ErrorResponse.message = `No task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    const task = await Task.findByPk(req.params.id);

    SuccessResponse.message = "Successfully updated a task";
    SuccessResponse.data = task;

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

    ErrorResponse.message = "Something went wrong while updating a task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function destroy(req, res) {
  try {
    const response = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (response === 0) {
      ErrorResponse.message = `No task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    SuccessResponse.message = "Successfully destroyed a task";
    SuccessResponse.data = {};

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while destroying a task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  getAll,
  getAllActive,
  get,
  getActive,
  create,
  update,
  destroy,
};
