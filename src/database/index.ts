import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const sequelize = new Sequelize(databaseName, username, password, {
  dialect: "mysql",
  logging: true,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection error:", err));

sequelize.sync({ alter: true });

export default sequelize;
