const express = require("express");

const { validateCreateRequest } = require("../../middlewares/user-middlewares");
const { getAll, create } = require("../../controllers/user-controller");

const router = express.Router();

router.get("/", getAll);
router.post("/", validateCreateRequest, create);

module.exports = router;
