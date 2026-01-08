import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { Req } from "basic";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_CLIENT_SECRET!,
    ) as any;

    //@ts-ignore
    req.auth = {
      id: decoded.id,
      role: "buyer",
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
