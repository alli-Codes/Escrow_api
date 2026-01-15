import express from "express";
import colors from "colors";
import cookieParser from "cookie-parser";
import users from "./routes/users";
import routes from "./routes";
import { auth } from "./middlewares/auth";

const server = express();
const port = process.env.PORT;

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(users);
server.use("/api/v1/users", routes.users);
server.use(auth);
server.use("/api/v1/escrow", routes.escrow);

server.listen(port, () =>
  console.log(colors.green(`Server is running on port ${port}`)),
);
