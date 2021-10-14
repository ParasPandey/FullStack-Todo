const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    requied: [true, "User must have a name"],
  },
  email: {
    type: String,
    unique: [true, "This email is already taken."],
    requied: [true],
  },
  password: {
    type: String,
    requied: [true, "User must have a password"],
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
    select: false,
  },
  todoList: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Todo",
    },
  ],
  Notes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Notes",
    },
  ],
});

// Middleware to hashed password
UserSchema.pre("save", async function (next) {
  // hash Password using salt
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  console.log(this);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
