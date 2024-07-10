const express = require("express");

const { validateCreateRequest } = require("../../middlewares/task-middlewares");
const { getAll, create } = require("../../controllers/task-controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", validateCreateRequest, create);

module.exports = router;
