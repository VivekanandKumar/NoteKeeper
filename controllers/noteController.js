const Notes = require("../models/Note");

const newNote = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.json({ message: "All fields required" });
  }
  try {
    const newNote = await new Notes({
      title,
      description,
      userId: req.userId,
    });
    await newNote.save();
    return res.status(201).json(newNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.userId });
    return res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const updateNote = async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;
  const modifiedNote = {
    title,
    description,
    userId: req.UserId,
  };
  try {
    await Notes.findByIdAndUpdate(id, modifiedNote, { new: true });
    return res.status(200).json(modifiedNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNote = await Notes.findByIdAndRemove(id);
    return res.status(202).json(deletedNote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { newNote, getNotes, updateNote, deleteNote };
