const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/label-middlewares");
const { getAll, create } = require("../../controllers/label-controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", validateCreateRequest, create);

module.exports = router;
