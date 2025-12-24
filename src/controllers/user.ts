import { Schema } from "json-validace";
import User from "../models/User";
import bcrypt from "bcryptjs";

type Account = {
  email: string;
  password: string;
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

  const user = await User.findOne({ where: { email: payload.email } });

  if (!user) {
    throw "User doesn't exist!";
  }

  const isPassword = await bcrypt.compare(payload.password, user.password);

  if (!isPassword) {
    throw "Invalid user credentials!";
  }

  return { status: 200, message: "User successfully logged in!", user };
};
