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

module.exports = {
  getAll,
};
