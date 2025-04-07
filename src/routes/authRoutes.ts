import express from 'express';
import { signUp, signIn, logoutUser, getAll} from '../controllers/authController'
import{validate} from '../middleware/Joi';
import {schema} from '../schema/joiSchema';


const router = express.Router();

router.post('/register', validate(schema.singUp), signUp);
router.post("/login",validate(schema.singIn), signIn);
router.post("/logout", logoutUser);
router.get('/login', getAll)

export default router
