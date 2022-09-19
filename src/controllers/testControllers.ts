import { Request , Response } from "express";
import { createTestInterface } from "../interfaces/interfaces";
import { creatTestService, getRelationTeacherDiscipline, getTestsService } from "../services/testServices";

export async function getTests(req: Request , res: Response ) {
    try{
        const tests = await getTestsService();
        res.send(tests);
     
    }catch(e){
        console.log(e)
        res.send(e);
    }
    
}

export async function createTest(req: Request , res: Response){
    const {name, pdfUrl , categoryId, discipline, teacher} = req.body;

    try{
        const relationTeacherDisciplineId = await getRelationTeacherDiscipline(teacher , discipline);

        const newTest: createTestInterface = {
            name: name,
            pdfURL: pdfUrl,
            categoryId: categoryId,
            teacherDisciplineId: relationTeacherDisciplineId[0].id
        };

        const testCreated = await creatTestService(newTest);

        res.status(201).send(testCreated);
    }catch(e){
        console.log(e);
        res.sendStatus(404);
    }
}