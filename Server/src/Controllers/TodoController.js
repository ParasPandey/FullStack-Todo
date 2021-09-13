const mongoose = require("mongoose");
const Todo = require("../Models/TodoModal.js");
const User = require("../Models/UserModal.js");

exports.addTodo = async (req, res) => {
  const { userId, todo, description, priority } = req.body;
  // console.log(userId, todo, description, priority);
  const newTodo = {
    userId,
    todo,
    description,
    priority,
  };
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Not Authorised!!!!!!, Please login to add Todo.",
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Not Authorised!!!!!!, Please login to add Todo.",
    });
  }
  console.log(user);
  const addTodo = await Todo.create(newTodo);
  const updatedTodoArray = [addTodo, ...user.todoList];
  await User.updateOne(
    { userId },
    { $set: { todoList: updatedTodoArray } }
  );
  console.log(addTodo);
  res.status(200).json({
    success: true,
    message: "New todo added",
  });
};
exports.fetchTodo = async (req, res) => {
  console.log("show todo");
  userId = "612e0d7a5f017b31ce3ccc71";
  const todos = await User.findById(userId).populate("todoList")
  console.log(todos);
  res.status(200).json({
    success: true,
    todos,
  });
};
