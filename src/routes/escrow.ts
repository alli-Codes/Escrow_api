import { Router } from "express";
import { Sequelize, DataTypes } from "sequelize";
import Escrow from "../models/Escrow";
import getUserEscrows from "../controllers/getUserEscrows";
import { createEscrow } from "../controllers/escrow";

const router = Router();
router.post("/create", async (req, res, next) => {
  try {
    createEscrow(req.body);
    res.status(201).json({ message: "Successfully created escrow." });
  } catch (error) {
    console.log("error:", error);
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  const escrow = await getUserEscrows("1");
  res.send(escrow);
});

export default router;
