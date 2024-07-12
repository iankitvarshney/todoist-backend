const TaskLabels = require("../models/taskLabel");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function addLabelToTask(req, res) {
  try {
    const response = await TaskLabels.create({
      TaskId: req.body.taskId,
      LabelId: req.body.labelId,
    });

    SuccessResponse.message = "Successfully added a label to task";
    SuccessResponse.data = response;

    return res.status(201).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while adding a label to task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function removeLabelFromTask(req, res) {
  try {
    const response = await TaskLabels.destroy({
      where: {
        TaskId: req.query.taskId,
        LabelId: req.query.labelId,
      },
    });

    if (response === 0) {
      ErrorResponse.message = "No task-label relationship is available";
      ErrorResponse.data = {};
      return res.status(404).json(ErrorResponse);
    }

    SuccessResponse.message = "Successfully removed a label from task";
    SuccessResponse.data = {};

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while removing a label from task";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  addLabelToTask,
  removeLabelFromTask,
};
