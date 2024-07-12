const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body.taskId || !req.body.labelId) {
    ErrorResponse.message = "Please pass all required parameters";
    return res.status(400).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
