const express = require("express");

const { getAll } = require("../../controllers/user-controller");

const router = express.Router();

router.get("/", getAll);

module.exports = router;
