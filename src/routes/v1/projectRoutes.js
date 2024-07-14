const express = require("express");

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require("../../middlewares/project-middlewares");
const {
  getAll,
  get,
  getAllTasks,
  create,
  update,
  destroy,
} = require("../../controllers/project-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.get("/:id/tasks", getAllTasks);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);
router.delete("/:id", destroy);

module.exports = router;
