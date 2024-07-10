const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/project-middlewares");
const { getAll, create } = require("../../controllers/project-controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", validateCreateRequest, create);

module.exports = router;
