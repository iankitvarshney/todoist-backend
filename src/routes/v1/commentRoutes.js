const express = require("express");

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require("../../middlewares/comment-middlewares");
const {
  getAll,
  get,
  create,
  update,
} = require("../../controllers/comment-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);

module.exports = router;
