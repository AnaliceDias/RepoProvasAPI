import { Prisma } from "@prisma/client";
import client from "../config/database";
import { createTestInterface } from "../interfaces/interfaces";

export async function findTests(query: string){

    return await client.$queryRawUnsafe(query)
}

export async function findRelationTeacherDiscipline(teacher: string, discipline: string){

    const relationId = await client.$queryRaw`
    SELECT "teachersDisciplines".id FROM "teachersDisciplines"
    JOIN disciplines
    ON "teachersDisciplines"."disciplineId" = disciplines.id
    JOIN "teachers"
    ON "teachersDisciplines"."teacherId" = teachers.id
    WHERE disciplines.name = ${discipline} AND teachers.name = ${teacher}`;
    
    return relationId
}

export async function insertTest(test: createTestInterface){
    const insertion = await client.tests.create({data: test});

    return insertion;
}

export async function findCategories(){
    const allCategories = await client.categories.findMany();

    return allCategories;
}
