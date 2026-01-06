import jwt from "jsonwebtoken";
import { Token } from "../models";

export const generateTokens = async function (payload: string) {
  const id = { payload };
  const accessTokenSecret = process.env.ACCESS_TOKEN_CLIENT_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_CLIENT_SECRET;

  const accessToken = jwt.sign(id, accessTokenSecret, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(id, refreshTokenSecret, {
    expiresIn: "7d",
  });

  Token.create({ userId: payload, refreshToken });

  return { accessToken, refreshToken };
};
