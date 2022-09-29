import { createTestInterface } from "../interfaces/interfaces";
import { findCategories, findRelationTeacherDiscipline, findTests, insertTest } from "../repositories/testRepository";

export async function getTestsService(searchSpecification){
    
    const query = custumizeQuery(searchSpecification);
    const tests: any = await findTests(query);
    
    if(!tests) throw new Error(`Erro ao acessar o banco`);

    return testsFilterService(searchSpecification , tests)
}

export function testsFilterService(specification , tests){

    if(specification.teacher) return filterByTeacher();
    else if(specification.discipline) return filterByDiscipline();
    else return filterDefault();

    function filterDefault(){
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
        });

        return filteredTests;
    }

    function filterByDiscipline(){
        let filteredTests: any = [];
        let disciplines: Array<string> = [];

        tests.map((test: any) => {
            if(!disciplines.find(discipline => discipline === test.discipline)){ 
                disciplines.push(test.discipline);
                filteredTests.push(
                    {
                    discipline: test.discipline,
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
                    term: test.term,
                    teacher: test.teacherName,
                    pdfUrl: test.pdfURL,
                    category: test.category
                    }
                    )
                }
            }
        });

        return filteredTests;
    }

    function filterByTeacher(){
        let filteredTests: any = [];
        let teachers: Array<string> = [];

        tests.map((test: any) => {
            if(!teachers.find(teacher => teacher === test.teacherName)){ 
                teachers.push(test.teacherName);
                filteredTests.push(
                    {
                    teacher: test.teacherName,
                    tests: []
                    }
                )
            };
        });

        tests.map((test: any) => {
            for(let i =0; i < filteredTests.length; i++){
                if (test.teacherName === filteredTests[i].teacher){
                    filteredTests[i].tests.push(
                    {
                    discipline: test.discipline,
                    name: test.test,
                    term: test.term,
                    pdfUrl: test.pdfURL,
                    category: test.category
                    }
                    )
                }
            }
        });

        return filteredTests;
    }

    // return filterByTeacher()
}

export function custumizeQuery(searchSpecification){

    let queryWhere = "WHERE ";
    let query = `
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
    ON tests."categoryId" = categories.id\n`;
    
    searchSpecification.discipline? queryWhere = queryWhere + `"disciplineId" = ${searchSpecification.discipline}` : 
    searchSpecification.teacher? queryWhere = queryWhere + `"teacherId" = ${searchSpecification.teacher}` :
    queryWhere = "";

    query = query + queryWhere;
    
    return query;
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

export async function getCategoriesService(){
    const allCategories = await findCategories();
    if(! allCategories) throw new Error();

    return allCategories;
}
