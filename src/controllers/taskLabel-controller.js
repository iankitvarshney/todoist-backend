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

module.exports = {
  addLabelToTask,
};
