import { createTestInterface } from "../interfaces/interfaces";
import { findRelationTeacherDiscipline, findTests, insertTest } from "../repositories/testRepository";

export async function getTestsService(){

    const tests: any = await findTests();
    
    if(!tests) throw new Error(`Erro ao acessar o banco`);

    let filteredTests: any = [];
    let disciplines: Array<string> = [];

    tests.map((test: any) => {
        if(!disciplines.find(discipline => discipline === test.discipline)){ 
            disciplines.push(test.discipline);
            filteredTests.push(
                {
                    discipline: test.discipline,
                    term: test.term,
                    teacher: test.teacherName,
                    tests: []
                }
            )
        };
    });

    tests.map((test: any) => {
        for(let i =0; i < filteredTests.length; i++){
            if (test.discipline === filteredTests[i].discipline){
                filteredTests[i].tests.push(
                    {
                        name: test.test,
                        pdfUrl: test.pdfURL,
                        category: test.category
                    }
                )
            }
        }
    })

    return filteredTests;
}

export async function getRelationTeacherDiscipline(teacher: string, discipline: string){

    const relationId: any = await findRelationTeacherDiscipline(teacher , discipline);
    
    if (!relationId || relationId.length === 0) throw new Error("Erro ao buscar relação professor-disciplina");

    return relationId;
}

export async function creatTestService(test: createTestInterface){
    const testCreated = await insertTest(test);
    if(! testCreated) throw new Error("Erro ao criar teste");

    return testCreated;
}