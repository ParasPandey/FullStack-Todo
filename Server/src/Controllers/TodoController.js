const mongoose = require("mongoose");
const Todo = require("../Models/TodoModal.js");
const User = require("../Models/UserModal.js");

// add a todo to a especific user
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
  const addTodo = await Todo.create(newTodo);
  const updatedTodoArray = [addTodo._id, ...user.todoList];
  await User.updateOne(
    { _id: userId },
    { $set: { todoList: updatedTodoArray } }
  );
  res.status(200).json({
    success: true,
    message: "New todo added",
    data: { addTodo },
  });
};

// fetch todo for especific users
exports.fetchTodo = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId)
    .populate("todoList")
    .sort({ _id: -1 });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Not Authorised!!!!!!, Please login to add Todo.",
    });
  }
  const todos = user.todoList;
  res.status(200).json({
    success: true,
    todos,
  });
};

// fetch todo by todoId
exports.fetchTodoById = async (req, res) => {
  const { todoId } = req.params;
  const todo = await Todo.findById(todoId);
  if (!todo) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo.",
    });
  }
  res.status(200).json({
    success: true,
    todo,
  });
};

// update the flag(isDone) of one todo according to todo id and userid

exports.updateTodoFlag = async (req, res) => {
  const { todoId } = req.params;
  const value = await Todo.findById(todoId).select("+ isDone");
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { isDone: !value.isDone },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Update Successfully",
    updatedTodo,
  });
};

// update one todo according to todo id and userid

exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { todo, description, priority } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { todo, description, priority },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Update Successfully",
    updatedTodo,
  });
};

// delete one todo according to todo id and userid

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  await Todo.findByIdAndDelete(todoId);
  const user = await User.findById(req.body.userId);
  let newList = user.todoList;
  newList = newList.filter((e) => String(e) !== String(todoId));

  await User.findByIdAndUpdate(req.body.userId, {
    $set: { todoList: newList },
  });
  res.status(200).json({
    success: true,
    message: "Delete Successfully",
  });
};
