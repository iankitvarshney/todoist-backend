const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/taskLabel-middlewares");
const { addLabelToTask } = require("../../controllers/taskLabel-controller");

const router = express.Router();

router.post("/", validateCreateRequest, addLabelToTask);

module.exports = router;
