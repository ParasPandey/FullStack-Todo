const express = require("express");
const router = express.Router();
const TodoController = require("./../Controllers/TodoController");

// todo router

// add or fetch user especific todos
router.post("/getTodo", TodoController.fetchTodo);
router.get("/getTodo/:todoId", TodoController.fetchTodoById);
router.post("/addTodo", TodoController.addTodo);
router.patch("/updateTodo/:todoId", TodoController.updateTodo);
router.patch("/updateTodoFlag/:todoId", TodoController.updateTodoFlag);
router.delete("/deleteTodo/:todoId", TodoController.deleteTodo);

module.exports = router;
