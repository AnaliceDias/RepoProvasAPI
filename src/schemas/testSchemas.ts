import Joi, { Schema } from "joi";

export const postTestSchema: Schema = Joi.object({
    name: Joi.string(),
    pdfUrl: Joi.string(),
    categoryId: Joi.number(),
    discipline: Joi.string(),
    teacher: Joi.string()
});