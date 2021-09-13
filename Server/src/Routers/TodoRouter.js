const express = require("express");
const router = express.Router();
const TodoController = require("./../Controllers/TodoController");

// todo router
router.get("/", TodoController.fetchTodo);
router.post("/", TodoController.addTodo);

module.exports = router;
