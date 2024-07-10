const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/section-middlewares");
const { getAll, create } = require("../../controllers/section-controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", validateCreateRequest, create);

module.exports = router;
