import { Router } from "express";
import {createNote,getAllNotes,updateNote,deleteNote,getDeletedNotes} from '../controller/noteController.js'
const noteRouter = Router();

noteRouter.get('/get-all-note',getAllNotes)
noteRouter.post('/create-note',createNote)
noteRouter.patch('/update-note',updateNote)
noteRouter.delete('/delete-note',deleteNote)
noteRouter.get('/get-deleted-note',getDeletedNotes)

export default noteRouter;