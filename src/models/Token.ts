import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../database";
// import User from "./User";

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize, timestamps: true },
);

// Token.belongsTo(User);

export default Token;
