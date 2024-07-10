const express = require("express");

const { validateCreateRequest } = require("../../middlewares/task-middlewares");
const { getAll, get, create } = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", validateCreateRequest, create);

module.exports = router;
