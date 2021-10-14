const mongoose = require("mongoose");
const Notes = require("../Models/NotesModal.js");
const User = require("../Models/UserModal.js");

exports.addNote = async (req, res) => {
  const { message, title, userId } = req.body;
  const newNote = {
    userId,
    title,
    message,
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

  const addNote = await Notes.create(newNote);
  const updatedNotesArray = [addNote._id, ...user.Notes];
  await User.updateOne({ _id: userId }, { $set: { Notes: updatedNotesArray } });
  res.status(200).json({
    success: true,
    message: "New Note added",
    data: { addNote },
  });
};

// fetch todo for especific Notes
exports.fetchUserNotes = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId).populate("Notes").sort({ _id: -1 });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Not Authorised!!!!!!, Please login to add Todo.",
    });
  }
  const notes = user.Notes;
  res.status(200).json({
    success: true,
    notes,
  });
};

// delete one todo according to todo id and userid

exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const { userId } = req.body;
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
  await Notes.findByIdAndDelete(noteId);
  let newList = user.Notes;
  newList = newList.filter((e) => String(e) !== String(userId));

  await User.findByIdAndUpdate(req.body.userId, {
    $set: { Notes: newList },
  });
  res.status(200).json({
    success: true,
    message: "Delete Successfully",
  });
};

// fetch todo by todoId
exports.fetchNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findById(noteId);
  if (!note) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo.",
    });
  }
  res.status(200).json({
    success: true,
    note,
  });
};

// update one todo according to todo id and userid

exports.updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { message, title } = req.body;
  const updatedNote = await Notes.findByIdAndUpdate(
    noteId,
    { message, title },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Update Successfully",
    updatedNote,
  });
};
