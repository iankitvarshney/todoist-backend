const express = require("express");

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require("../../middlewares/section-middlewares");
const {
  getAll,
  get,
  create,
  update,
  destroy,
} = require("../../controllers/section-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);
router.delete("/:id", destroy);

module.exports = router;
