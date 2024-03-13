const { Router } = require("express");
const {
  add,
  get,
  updateNote,
  deleteNote,
} = require("../controller/note.controller");

const noteRouter = Router();

noteRouter.post("/", add);
noteRouter.get("/", get);
noteRouter.put("/:noteId", updateNote);
noteRouter.delete("/:noteId", deleteNote);

module.exports = { noteRouter };
