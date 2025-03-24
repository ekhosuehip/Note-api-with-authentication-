import express from 'express';
import { Request, Response, NextFunction } from 'express';
import {protect} from '../middleware/authMiddleware'
import{validate} from '../middleware/Joi';
import {schema} from '../schema/joiSchema'
import {createNote, getNote, getAllNote, updateNote, getCategories,createCategory, deleteNote} from '../controllers/noteController';

const router = express.Router();

// protect all routes

router.use(protect); 

router.get('/categories', getCategories);
router.get('/', getAllNote);
router.get('/:noteId', getNote);
router.post('/',validate(schema.note), createNote);
router.post('/category', createCategory)
router.put('/:noteId',validate(schema.note), updateNote);
router.delete('/:noteId', deleteNote);

export default router
