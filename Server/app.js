const express = require("express");
const UserRouter = require("./src/Routers/UserRouter.js");
const TodoRouter = require("./src/Routers/TodoRouter.js");
const NotesRouter = require("./src/Routers/NotesRouter.js");
const cors = require("cors");
const app = express();


app.use(cors());

app.use(express.json());

// Routers
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/todo", TodoRouter);
app.use("/api/v1/notes", NotesRouter);

module.exports = app;
