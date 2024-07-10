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
} = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAllActive);
router.get("/:id", getActive);
router.post("/", validateCreateRequest, create);
router.patch("/:id", validateUpdateRequest, update);

module.exports = router;
