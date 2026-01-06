import { Router } from "express";
import { getUser, loginUser, createUser } from "../controllers/user";

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
    const { refreshToken, ...response } = await loginUser(req.body);
    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
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
