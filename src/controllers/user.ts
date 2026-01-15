import { Schema } from "json-validace";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateTokens } from "../controllers/token";
import { Request, Response, NextFunction } from "express";

/*
 **** Function to create a user and write to DB ****
 */
export const createUser = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = new Schema({
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: ["email", "please insert a valid email"], required: true },
    password: { type: "string", required: true },
    accountType: { type: "string", required: true },
  });

  const result = schema.validate(req.body);

  if (result.error) {
    throw result.error;
  }
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    res.status(400).json({ message: "Email already exist" });
  }

  return User.create(result.data);
};

/*
 **** Function to login user ****
 */

export const loginUser = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const schema = new Schema({
    email: { type: "email", required: true },
    password: { type: "string", required: true },
  });

  const { data, error } = schema.validate(req.body);

  // If error from the validation
  if (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }

  // Query user using email from DB
  const result = await User.findOne({
    where: { email: data.email },
  });

  // If user does not exit in DB
  if (!result) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Destructure password from the data and comparing passwords
  const { password, ...user } = result.toJSON();

  const isPassword = await bcrypt.compare(data.password, password);

  if (!isPassword) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // Generating tokens
  const { accessToken, refreshToken } = await generateTokens(user.id);

  return res.status(200).json({
    status: 200,
    message: "User successfully logged in!",
    user,
    accessToken,
    refreshToken,
  });
};

/*
 **** Function to get a user from DB ****
 */
export const getUser = async function (id: string) {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw "User doesn't exist";
    }
    return user;
  } catch (err) {
    throw err;
  }
};
