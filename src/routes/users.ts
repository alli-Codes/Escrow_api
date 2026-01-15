import { Router } from "express";
import { getUser, loginUser, createUser, test } from "../controllers/user";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);

// router.post("/login", async (req, res) => {
//   try {
//     const { refreshToken, ...response } = await loginUser(req.body);
//     res.cookie("refreshToken", refreshToken, {
//       expires: new Date(Date.now() + 900000),
//       httpOnly: true,
//     });
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

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
