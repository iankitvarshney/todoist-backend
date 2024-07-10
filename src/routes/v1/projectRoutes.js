const express = require("express");

const {
  validateCreateRequest,
} = require("../../middlewares/project-middlewares");
const {
  getAll,
  get,
  create,
  update,
} = require("../../controllers/project-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);
router.patch("/:id", update);

module.exports = router;
