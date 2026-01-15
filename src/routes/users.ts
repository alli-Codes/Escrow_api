import { Router } from "express";
import { getUser, loginUser, createUser } from "../controllers/user";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_CLIENT_SECRET,
    ) as { id: string };
    const user = await getUser(payload.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
