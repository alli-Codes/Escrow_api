import { Request, Response, NextFunction } from "express";
import { createUser, loginUser, getUser } from "../controllers/user";

/*
 **** Function to create a user and write to DB ****
 */

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      message: "User created successfully!",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/*
 **** Function to login user ****
 */

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginUser(req.body);
    // console.log(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/*
 **** Function to get a user from DB ****
 */
export const getUserHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await getUser(token);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
