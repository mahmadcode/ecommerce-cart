const bcrypt = require("bcryptjs");
const { findUser, userCreation } = require("./userHelper");

const asyncHandler = require("express-async-handler");

const {
  generateToken,
  expressValidatorError,
} = require("../../middleware/commonMiddleware");
const { validateUser } = require("../../models/users");

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  try {
    //check user email verification
    const user = await findUser(req.body.email);

    if (!user) {
      res.status(400);
      throw new Error("No user found!");
    }

    //check password and give token
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      return res.status(200).send({
        token: generateToken(user),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials or user not found.");
    }
  } catch (error) {
    //error handling
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${res.statusCode !== 400 ? "Something went wrong during login: " : ""}${
        error.message
      }`
    );
  }
});

// @desc Create new user
// @route POST /api/users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  const user = req.body;

  //validate user
  if (user) {
    const { error } = validateUser(user);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  }

  try {
    //check if user exist
    const userExists = await findUser(user.email);
    if (userExists) {
      res.status(400);
      throw new Error("User already exists with same email address");
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(user.password, salt);
    user.password = encryptPass;

    //create user
    const result = await userCreation(user);
    if (!result) {
      res.status(400);
      throw new Error("User could not be created!");
    }

    return res.status(200).send({
      token: generateToken(result),
    });
  } catch (error) {
    //error handling
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400 ? "Something went wrong in user creation: " : ""
      }${error.message}`
    );
  }
});

// @desc get logedin user
// @route GET /api/users/
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.result);
});

module.exports = {
  createUser,
  loginUser,
  getUser,
};
