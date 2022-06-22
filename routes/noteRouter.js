const {
  newNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const express = require("express");
const noteRouter = express.Router();

noteRouter.post("/", auth, newNote);
noteRouter.get("/", auth, getNotes);
noteRouter.patch("/:id", auth, updateNote);
noteRouter.delete("/:id", auth, deleteNote);

module.exports = noteRouter;
