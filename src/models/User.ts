import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcryptjs";

class User extends Model {
  public id: string;
  public password: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    hooks: {
      async beforeCreate(user: User) {
        if (user.password) {
          user.password = await bcrypt.hash(
            user.password,
            Number(process.env.PASSWORD_SALT),
          );
        }
      },
    },
  },
);

export default User;
