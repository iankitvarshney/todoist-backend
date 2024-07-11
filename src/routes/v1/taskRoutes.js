const express = require("express");

const {
  validateCreateRequest,
  validateUpdateRequest,
} = require("../../middlewares/task-middlewares");
const {
  getAllActive,
  getActive,
  create,
  update,
  close,
  destroy,
} = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAllActive);
router.get("/:id", getActive);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);
router.patch("/:id/close", close);
router.delete("/:id", destroy);

module.exports = router;
