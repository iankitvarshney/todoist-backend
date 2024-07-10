const express = require("express");

const {
  validateCreateRequest,
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
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
