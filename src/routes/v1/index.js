const express = require("express");

const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const sectionRoutes = require("./sectionRoutes");
const taskRoutes = require("./taskRoutes");
const commentRoutes = require("./commentRoutes");
const labelRoutes = require("./labelRoutes");
const taskLabelRoutes = require("./taskLabelRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/sections", sectionRoutes);
router.use("/tasks", taskRoutes);
router.use("/comments", commentRoutes);
router.use("/labels", labelRoutes);
router.use("/taskLabels", taskLabelRoutes);

module.exports = router;
