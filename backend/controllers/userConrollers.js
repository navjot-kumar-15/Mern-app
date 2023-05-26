import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genrateToken from "../utils/genrateToken.js";

//@ desc   Auth user/set token
// route  api/user/auth
// @access public
export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    genrateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//@ desc   registe a new user
// route   POST api/users/
// @access public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExit = await User.findOne({ email });
  if (userExit) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Creating a new user
  const user = User.create({
    name,
    email,
    password,
  });

  if (user) {
    genrateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@ desc   Logout user
// route   POST api/users/logout
// @access public
export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout user" });
});

//@ desc   Get user profile
// route   GET /api/users/profile
// @access private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: " User profile" });
});

//@ desc   Update user profile
// route   PUT /api/users/profile
// @access private
export const updateUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: " Update user profile" });
});
