import dotenv from "dotenv";
import { Sequelize, DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../database";
dotenv.config();

class Escrow extends Model {}

Escrow.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    buyerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "funded", "released", "cancelled"),
      defaultValue: "pending",
    },
  },
  { sequelize, timestamps: true },
);

export default Escrow;
