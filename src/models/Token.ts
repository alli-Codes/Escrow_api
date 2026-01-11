import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Token extends Model {
  public refreshToken: string;
  public userId: string;
}

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

export default Token;
