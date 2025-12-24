import { Router } from "express";
// import User from "../../src/models/User";
import { createUser } from "../controllers/createUser";
import { getUser, loginUser } from "../controllers/user";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await getUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
