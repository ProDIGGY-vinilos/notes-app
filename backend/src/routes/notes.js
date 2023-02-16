import express from "express";
import noteController from "../controllers/notes";
import noteValidation from "../validations/validate";

const router = express.Router();

router.get("/", noteController.getNotes);
router.get("/archived", noteController.getArchivedNotes);
router.get("/:id", noteController.getOneNote);
router.post("/", noteValidation.createValidation, noteController.createNote);
router.put("/:id", noteValidation.editValidation, noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

export default router;
