const express = require("express");

const {
  validateCreateRequest,
  validateDeleteRequest,
} = require("../../middlewares/taskLabel-middlewares");
const {
  addLabelToTask,
  removeLabelFromTask,
} = require("../../controllers/taskLabel-controller");

const router = express.Router();

router.post("/", validateCreateRequest, addLabelToTask);
router.delete("/", validateDeleteRequest, removeLabelFromTask);

module.exports = router;
