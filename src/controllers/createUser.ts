import User from "../models/User";
import bcrypt from "bcryptjs";
import { Schema } from "json-validace";

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
