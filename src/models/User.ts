import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcryptjs";
// import Token from "./Token";

class User extends Model {
  public id: string;
  public password: string;

  // public static associate(models: any) {
  //   User.hasMany(models.User, { foreignKey: "userId" });
  // }
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
        // hash password
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

// User.hasMany(Token, {
//   foreignKey: "userId",
// });

export default User;
