import Joi, { Schema } from "joi";

export const postTestSchema: Schema = Joi.object({
    name: Joi.string(),
    pdfUrl: Joi.string().uri(),
    categoryId: Joi.number().strict(),
    discipline: Joi.string(),
    teacher: Joi.string()
});