const express = require("express");
const router = express.Router();
const NotesController = require("./../Controllers/NotesController");

// todo router

// add or fetch user especific todos
router.post("/getUserNotes", NotesController.fetchUserNotes);
router.get("/getNote/:noteId", NotesController.fetchNoteById);
router.post("/addNote", NotesController.addNote);
router.patch("/updateNote/:noteId", NotesController.updateNote);
router.delete("/deleteNote/:noteId", NotesController.deleteNote);

module.exports = router;
