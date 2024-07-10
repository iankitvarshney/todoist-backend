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

module.exports = {
  getAll,
};
