const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: String,
  Description: String,
});

const Note = mongoose.model("note", NotesSchema);

module.exports = { Note };
