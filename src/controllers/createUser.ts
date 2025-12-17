import User from "../models/User";
import bcrypt from "bcryptjs";

type Account = {
  firstName: string;
  lastName: string;
  password: string;
  accountType: string;
};

export const createUser = async function (payload: Account) {
  const salt = bcrypt.genSaltSync(10);

  const user = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: bcrypt.hashSync(payload.password, salt),
    accountType: payload.accountType,
  };

  return User.create(user);
};
