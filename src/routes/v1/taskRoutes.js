const express = require("express");

const { validateCreateRequest } = require("../../middlewares/task-middlewares");
const {
  getAllActive,
  getActive,
  create,
} = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAllActive);
router.get("/:id", getActive);
router.post("/", validateCreateRequest, create);

module.exports = router;
