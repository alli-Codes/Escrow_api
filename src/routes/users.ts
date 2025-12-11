import { Router } from "express";

const router = Router();
router.get("/api/v1/user", (req, res) => res.send("hello"));

export default router;
