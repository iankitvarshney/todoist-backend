const express = require("express");

const { getAll } = require("../../controllers/project-controller");

const router = express.Router();

router.get("/", getAll);

module.exports = router;
