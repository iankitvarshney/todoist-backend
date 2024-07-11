const { Op } = require("sequelize");

const Section = require("../models/section");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const filterArray = [];

    if (req.query.projectId) {
      filterArray.push({
        projectId: req.query.projectId,
      });
    }

    const sections = await Section.findAll({
      where: {
        [Op.and]: filterArray,
      },
    });

    SuccessResponse.message = "Successfully fetched all sections";
    SuccessResponse.data = sections;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all sections";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function get(req, res) {
  try {
    const section = await Section.findByPk(req.params.id);

    if (section === null) {
      SuccessResponse.message = `No section is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully fetched a section";
    SuccessResponse.data = section;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching a section";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function create(req, res) {
  try {
    const section = await Section.create(req.body);

    SuccessResponse.message = "Successfully created a section";
    SuccessResponse.data = section;

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

    ErrorResponse.message = "Something went wrong while creating a section";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function update(req, res) {
  try {
    const response = await Section.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (response[0] === 0) {
      SuccessResponse.message = `No section is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    const section = await Section.findByPk(req.params.id);

    SuccessResponse.message = "Successfully updated a section";
    SuccessResponse.data = section;

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

    ErrorResponse.message = "Something went wrong while updating a section";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function destroy(req, res) {
  try {
    const response = await Section.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (response === 0) {
      SuccessResponse.message = `No section is available with id ${req.params.id}`;
      SuccessResponse.data = {};
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully destroyed a section";
    SuccessResponse.data = {};

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while destroying a section";
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
