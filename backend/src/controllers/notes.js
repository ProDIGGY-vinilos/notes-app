import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getNotes = async (req, res) => {
  try {
    const notes = await prisma.notes.findMany({
      where: {
        archived: 0,
      },
    });
    res.status(200).json({
      message: "Notes founded",
      data: notes,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAll: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const getArchivedNotes = async (req, res) => {
  try {
    const notes = await prisma.notes.findMany({
      where: {
        archived: 1,
      },
    });
    res.status(200).json({
      message: "Archived notes founded",
      data: notes,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getArchived: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const getOneNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.notes.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Note founded",
      data: note,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getOne: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description, archived } = req.body;
    const note = await prisma.notes.create({
      data: {
        title,
        description,
        archived: 0,
      },
    });
    res.status(200).json({
      message: "Note created",
      data: note,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in create: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, archived } = req.body;
    const note = await prisma.notes.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        archived,
      },
    });
    res.status(200).json({
      message: "Note updated",
      data: note,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in update: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.notes.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Note deleted",
      data: note,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in delete: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getNotes,
  getArchivedNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
};
