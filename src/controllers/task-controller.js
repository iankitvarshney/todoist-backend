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
      ErrorResponse.message = `No task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
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
      ErrorResponse.message = `No task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
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

async function getTaskLabels(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task === null) {
      ErrorResponse.message = `No task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    const labels = await task.getLabels();

    SuccessResponse.message = "Successfully fetched all labels of a task";
    SuccessResponse.data = labels;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching all labels of a task";
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

async function handleOpenCloseSubtasks(parentIds, value) {
  try {
    const tasks = await Task.findAll({
      where: { parentId: parentIds },
    });

    const childIds = tasks.map((task) => task.id);

    const response = await Task.update(
      { isCompleted: value },
      {
        where: {
          [Op.and]: [{ id: childIds }, { isCompleted: { [Op.ne]: value } }],
        },
      }
    );

    return childIds;
  } catch (error) {
    throw error;
  }
}

async function close(req, res) {
  try {
    const response = await Task.update(
      { isCompleted: true },
      {
        where: {
          [Op.and]: [{ id: req.params.id }, { isCompleted: false }],
        },
      }
    );

    if (response[0] === 0) {
      ErrorResponse.message = `No opened task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    let parentIds = [req.params.id];

    while (parentIds.length > 0) {
      parentIds = await handleOpenCloseSubtasks(parentIds, true);
    }

    SuccessResponse.message = "Successfully closed a task";
    SuccessResponse.data = {};

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while closing a task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function reopen(req, res) {
  try {
    const response = await Task.update(
      { isCompleted: false },
      {
        where: {
          [Op.and]: [{ id: req.params.id }, { isCompleted: true }],
        },
      }
    );

    if (response[0] === 0) {
      ErrorResponse.message = `No closed task is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    let parentIds = [req.params.id];

    while (parentIds.length > 0) {
      parentIds = await handleOpenCloseSubtasks(parentIds, false);
    }

    SuccessResponse.message = "Successfully reopened a task";
    SuccessResponse.data = {};

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while reopening a task";
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
  getTaskLabels,
  create,
  update,
  close,
  reopen,
  destroy,
};
