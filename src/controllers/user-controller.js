const User = require("../models/user");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function getAll(req, res) {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      SuccessResponse.message = "No user is available";
      return res.status(404).json(SuccessResponse);
    }

    SuccessResponse.message = "Successfully fetched all users";
    SuccessResponse.data = users;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching all users";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);

    SuccessResponse.message = "Successfully created a user";
    SuccessResponse.data = user;

    return res.status(201).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating a user";
    ErrorResponse.error = error;

    return res.status(500).json(ErrorResponse);
  }
}

module.exports = {
  getAll,
  create,
};
