import { Router } from "express";
// import User from "../../src/models/User";
import { createUser } from "../controllers/createUser";

const router = Router();
router.post("/api/v1/users/create", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/api/v1/user", (req, res) => res.send("hello"));

export default router;
