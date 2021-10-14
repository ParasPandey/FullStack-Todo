const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    require: [true, "Note must have a user id"],
    ref: "User",
  },
  message: {
    type: String,
    required: [true, "A note must have a message"],
  },
  title: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
