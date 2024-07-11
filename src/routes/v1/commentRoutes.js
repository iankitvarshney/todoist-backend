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
  destroy,
} = require("../../controllers/comment-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);
router.delete("/:id", destroy);

module.exports = router;
