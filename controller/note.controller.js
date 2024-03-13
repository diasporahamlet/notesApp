const { Note } = require("../models/note.models");

const add = async (req, res) => {
  const { userId } = req.user;
  const payLoad = {
    ...req.body,
    userId,
  };
  try {
    const note = await Note.create(payLoad);
    res.status(200).json({ msg: "note created", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error " });
  }
};

const get = async (req, res) => {
  try {
    const { userId } = req.user;
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error " });
  }
};
const updateNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const { noteId } = req.params;
    const payload = req.body;
    const note = await Note.findById(noteId);
    console.log(note, noteId);
    if (!note) {
      return res.json({ msg:"note not found"});
    }
    if (note?.userId.toString() !== userId) {
      return res.json({ msg:"you can update only your note"});
    }

    const newnote = await Note.findByIdAndUpdate(noteId, payload, {
      upsert: true,
      new: true,
    });
    res.status(200).json({ msg: "note updated successfully", newnote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error " });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) {
      return res.json({ msg:"note not found"});
    }
    if (note?.userId.toString() !== userId) {
      return res.json({ msg:"you can delete only your note"});
    }

    await Note.findByIdAndDelete(noteId);
    res.status(202).json({ msg: "note deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error " });
  }
};

module.exports = {
  add,
  get,
  updateNote,
  deleteNote,
};
