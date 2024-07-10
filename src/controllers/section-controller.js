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

module.exports = {
  getAll,
  create,
};
