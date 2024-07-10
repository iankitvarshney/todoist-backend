const express = require("express");

const { validateCreateRequest } = require("../../middlewares/task-middlewares");
const {
  getAllActive,
  get,
  create,
} = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAllActive);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);

module.exports = router;
