import { Router } from "express";
import {
  createUserHandler,
  loginUserHandler,
  getUserHandler,
} from "../handlers/user";

const router = Router();

router.post("/create", createUserHandler);
router.post("/login", loginUserHandler);
router.get("/", getUserHandler);

export default router;
