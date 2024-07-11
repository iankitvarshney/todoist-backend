const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body.name || !req.body.order || !req.body.userId) {
    ErrorResponse.message = "Please pass all required parameters";
    return res.status(400).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
