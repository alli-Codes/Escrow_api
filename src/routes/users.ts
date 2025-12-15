import { Router } from "express";
import User from "../../src/models/User";

const router = Router();
router.post("/api/v1/users/create", async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
});
router.get("/api/v1/user", (req, res) => res.send("hello"));

export default router;
