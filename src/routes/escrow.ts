import { Router } from "express";
import { Sequelize, DataTypes } from "sequelize";
import Escrow from "../models/Escrow";
import getUserEscrows from "../controllers/getUserEscrows";
import {
  createEscrow,
  editEscrowBySeller,
  getAllUserEscrow,
} from "../controllers/escrow";

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

router.patch("/edit/:id", async (req, res) => {
  try {
    await editEscrowBySeller(req.params.id, req.body);
    res.status(201).json({ message: "Edited Successfully!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    // console.log(req.user);
    const escrows = await getAllUserEscrow(req.params.id);
    console.log(escrows);
    res.status(201).json(escrows);
  } catch (error) {
    console.log(error);
  }
});

export default router;
