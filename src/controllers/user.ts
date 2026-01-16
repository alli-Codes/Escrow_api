import { Schema } from "json-validace";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateTokens } from "../controllers/token";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type UserType = {
  email: string;
  password: string;
};

/*
 **** Function to create a user and write to DB ****
 */
export const createUser = async function (payload: UserType) {
  const schema = new Schema({
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: ["email", "please insert a valid email"], required: true },
    password: { type: "string", required: true },
    accountType: { type: "string", required: true },
  });

  const result = schema.validate(payload);

  if (result.error) {
    throw result.error;
  }
  const user = await User.findOne({
    where: { email: payload.email },
  });

  if (user) {
    throw new Error("Email already exist");
  }

  const newUser = await User.create(result.data);
  const withoutPassword = await newUser.withoutField(["password"]);

  return withoutPassword;
};

/*
 **** Function to login user ****
 */

export const loginUser = async ({ email, password }: UserType) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const tokens = await generateTokens(user.id);
  return { user, ...tokens };
};

/*
 **** Function to get a user from DB ****
 */
export const getUser = async function (token: string) {
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_CLIENT_SECRET) as {
    id: string;
  };
  const user = await User.findByPk(payload.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};
