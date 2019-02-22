const express = require("express");
const helmet = require("helmet");

const projects = require("./data/routes/projects.js");
const actions = require("./data/routes/actions.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projects);
server.use("/api/actions", actions);

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on port number ${port}!`);
});
