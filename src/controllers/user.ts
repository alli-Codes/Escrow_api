import { Schema } from "json-validace";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateTokens } from "../controllers/token";

type Account = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: string;
};

export const createUser = async function (payload: Account) {
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
  const user = await User.findOne({ where: { email: payload.email } });

  if (user) {
    throw "Email already exist";
  }

  return User.create(result.data);
};

export const loginUser = async function (payload: Account) {
  const schema = new Schema({
    email: { type: "email", required: true },
    password: { type: "string", required: true },
  });

  const result = schema.validate(payload);

  if (result.error) {
    throw result.error;
  }

  const user = await User.findOne({
    where: { email: payload.email },
  });

  if (!user) {
    throw "User doesn't exist!";
  }

  const isPassword = await bcrypt.compare(payload.password, user.password);

  if (!isPassword) {
    throw "Invalid user credentials!";
  }

  const { password, ...userWithoutPassword } = user.toJSON();

  const { accessToken, refreshToken } = await generateTokens(user.id);

  return {
    status: 200,
    message: "User successfully logged in!",
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

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
