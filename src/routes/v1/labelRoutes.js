const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/label-middlewares");
const { getAll, get, create } = require("../../controllers/label-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);

module.exports = router;
