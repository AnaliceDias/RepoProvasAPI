import Joi, { Schema } from "joi";

export const createUserSchema: Schema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().min(6).max(12),
    repeatedPassword: Joi.string().min(6).max(12),
});

export const conectUserSchema: Schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
});