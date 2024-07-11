const { Op } = require("sequelize");

const Label = require("../models/label");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const filterArray = [];

    if (req.query.userId) {
      filterArray.push({
        userId: req.query.userId,
      });
    }

    const labels = await Label.findAll({
      where: {
        [Op.and]: filterArray,
      },
    });

    SuccessResponse.message = "Successfully fetched all labels";
    SuccessResponse.data = labels;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all labels";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function get(req, res) {
  try {
    const label = await Label.findByPk(req.params.id);

    if (label === null) {
      ErrorResponse.message = `No label is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    SuccessResponse.message = "Successfully fetched a label";
    SuccessResponse.data = label;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching a label";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function create(req, res) {
  try {
    const label = await Label.create(req.body);

    SuccessResponse.message = "Successfully created a label";
    SuccessResponse.data = label;

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

    ErrorResponse.message = "Something went wrong while creating a label";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function update(req, res) {
  try {
    const response = await Label.update(
      {
        name: req.body.name,
        color: req.body.color,
        order: req.body.order,
        isFavorite: req.body.isFavorite,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (response[0] === 0) {
      ErrorResponse.message = `No label is available with id ${req.params.id}`;
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    const label = await Label.findByPk(req.params.id);

    SuccessResponse.message = "Successfully updated a label";
    SuccessResponse.data = label;

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

    ErrorResponse.message = "Something went wrong while updating a label";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  getAll,
  get,
  create,
  update,
};
