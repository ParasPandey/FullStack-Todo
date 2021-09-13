const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    require: [true, "Todo must have a user id"],
    ref: "User",
  },
  todo: {
    type: String,
    required: [true, "A todo must have a message"],
  },
  description: {
    type: String,
  },
  priority: {
    type: Number,
    default: 4,
    min: 1,
    max: 4,
  },
  isDone: {
    type: Boolean,
    required: [true, "List must have isDone Field"],
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
