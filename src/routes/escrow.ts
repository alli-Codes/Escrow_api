import { Router } from "express";
import { Sequelize, DataTypes } from "sequelize";
import Escrow from "../models/Escrow";

// const username = "admin";
// const password = "@lliCodes123";

// const sequelize = new Sequelize("escrow_app", username, password, {
//   dialect: "mysql",
// });

// sequelize
//   .sync()
//   .then(async () => console.log("App connected to mySQL server."))
//   .catch(async (error) => console.log(error));

// const Escrow = sequelize.define("Escrow", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   productName: DataTypes.STRING,
//   productPrice: DataTypes.INTEGER,
//   createdAt: DataTypes.DATE,
//   updatedAt: DataTypes.DATE,
// });

const router = Router();
router.post("/create", async (req, res, next) => {
	const escrow = await Escrow.create(req.body);
	console.log(escrow)
	res.send(req.body);
});

export default router;
