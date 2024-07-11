const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (
    !req.body.content ||
    !req.body.userId ||
    (!req.body.projectId && !req.body.taskId) ||
    (req.body.projectId && req.body.taskId)
  ) {
    ErrorResponse.message = "Please pass all required parameters";
    return res.status(400).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
