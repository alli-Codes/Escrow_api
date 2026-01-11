import { Router } from "express";
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

router.get("/all", async (req, res) => {
  try {
    //@ts-ignore
    //
    const escrows = await getAllUserEscrow(req.auth);
    //@ts-ignore
    console.log(req.auth.id);
    res.status(200).json(escrows);
  } catch (error) {
    console.log(error);
  }
});

export default router;
