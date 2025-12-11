
import dotenv from "dotenv";
import { Sequelize, DataTypes, Model, UUIDV4 } from "sequelize";

dotenv.config()

const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const sequelize = new Sequelize(
	databaseName, 
	username, 
	password, {
  dialect: "mysql",
  logging: true,
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Connection error:", err));

//await sequelize.sync({ alter: true });

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
      type: DataTypes.TEXT,
      allowNull: false,
    },

   pricet: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    quantity: {
	type: DataTypes.INTEGER,
	defaultValue: 1
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
  { sequelize, timestamps: true}
);

sequelize.sync({alter: true});

export default Escrow;
