import client from "../config/database";
import { createTestInterface } from "../interfaces/interfaces";

export async function findTests(){
    
    return await client.$queryRaw`
    SELECT disciplines.name as discipline ,
    teachers.name as "teacherName" ,
    terms.number as term,
    tests.name as test,
    categories.name as category,
    "pdfURL"
    FROM "teachersDisciplines"
    JOIN disciplines
    ON "teachersDisciplines"."disciplineId" = disciplines.id
    JOIN "teachers"
    ON "teachersDisciplines"."teacherId" = teachers.id
    JOIN terms
    ON disciplines."termId" = terms.id
    JOIN tests
    ON tests."teacherDisciplineId" = "teachersDisciplines".id
    JOIN categories
    ON tests."categoryId" = categories.id
    `
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