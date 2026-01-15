import { Router } from "express";
import { getUser, loginUser, createUser } from "../controllers/user";

const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);

router.get("/", getUser);

export default router;
