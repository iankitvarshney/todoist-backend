const express = require("express");

const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

module.exports = router;
