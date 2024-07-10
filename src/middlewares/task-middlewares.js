const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (
    !req.body.content ||
    !req.body.order ||
    !req.body.creatorId ||
    (!req.body.projectId && !req.body.sectionId) ||
    (req.body.projectId && req.body.sectionId)
  ) {
    ErrorResponse.message = "Please pass all required parameters";
    return res.status(400).json(ErrorResponse);
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    ErrorResponse.message = "Request body should not be empty";
    ErrorResponse.data = {};
    return res.status(400).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
