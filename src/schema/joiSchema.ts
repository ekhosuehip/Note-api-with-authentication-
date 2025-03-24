import Joi from 'joi';
import { INote } from '../interfaces/Note';
import { IUser } from '../interfaces/User'

export const schema = {
    note: Joi.object<INote>({
        title: Joi.string().min(1).required(),
        content: Joi.string().min(5).required(),
        category: Joi.string().min(20).optional()
    }),
    singUp: Joi.object<IUser>({
        name: Joi.string().min(1).required(),
        email: Joi.string().email({ minDomainSegments: 2}).required(),
        password: Joi.string()
        .pattern(new RegExp('^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$')),
    }),
    singIn: Joi.object<IUser>({
        email: Joi.string().email({ minDomainSegments: 2}).required(),
        password: Joi.string()
        .pattern(new RegExp('^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$')),
    })
};