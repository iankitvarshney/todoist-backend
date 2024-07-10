const express = require("express");

const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const sectionRoutes = require("./sectionRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/sections", sectionRoutes);

module.exports = router;
