const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/comment-middlewares");
const { getAll, create } = require("../../controllers/comment-controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", validateCreateRequest, create);

module.exports = router;
