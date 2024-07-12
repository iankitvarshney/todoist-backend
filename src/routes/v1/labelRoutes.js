const express = require("express");

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require("../../middlewares/label-middlewares");
const {
  getAll,
  get,
  getLabelTasks,
  create,
  update,
  destroy,
} = require("../../controllers/label-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.get("/:id/tasks", getLabelTasks);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);
router.delete("/:id", destroy);

module.exports = router;
