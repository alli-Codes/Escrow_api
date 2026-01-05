import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../database";
import User from "./User";

class Token extends Model {
  public static associate(models: any) {
    Token.belongsTo(models.User, { foreignKey: "userId" });
  }
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
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize, timestamps: true },
);

export default Token;
