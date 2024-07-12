const express = require("express");

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require("../../middlewares/task-middlewares");
const {
  getAllActive,
  getActive,
  getTaskLabels,
  create,
  update,
  close,
  reopen,
  destroy,
} = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAllActive);
router.get("/:id", getActive);
router.get("/:id/labels", getTaskLabels);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);
router.patch("/:id/close", close);
router.patch("/:id/reopen", reopen);
router.delete("/:id", destroy);

module.exports = router;
