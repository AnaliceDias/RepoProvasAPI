import { categories, disciplines, teachers, terms, tests, users } from "@prisma/client";

export type  createUserInterface = Omit<users , "id" | "created_at">

export type createTermInterface = Omit<terms , "id">

export type createCategoriesInterface = Omit<categories , "id">

export type createTeacherInterface = Omit<teachers , "id">

export type createDisciplineInterface = Omit<disciplines , "id">

export type createTestInterface = Omit<tests , "id">