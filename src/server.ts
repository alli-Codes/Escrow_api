import express from "express";
import users from "./routes/users";
import colors from "colors";
import routes from "./routes";

const server = express();
const port = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(users);
server.use("/api/v1/escrow", routes.escrow);
server.get("/api/v1/users", (req, res) => res.send(users));

server.listen(port, () =>
  console.log(colors.green(`Server is running on port ${port}`)),
);
