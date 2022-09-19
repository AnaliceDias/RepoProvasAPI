import client from "../src/config/database"
import { 
    createCategoriesInterface,
    createDisciplineInterface,
    createTeacherInterface,
    createTermInterface }
from "../src/interfaces/interfaces"

seeding()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await client.$disconnect()
  })

async function seeding(){

    const terms : createTermInterface[] = [
        {number: 1},
        {number: 2},
        {number: 3},
        {number: 4},
        {number: 5},
        {number: 6}
    ];

    const categories : createCategoriesInterface[] = [
        {name: "Projeto"},
        {name: "Prática"},
        {name: "Recuperação"}  
    ];

    const teachers : createTeacherInterface[] = [
        {name: "Diego Pinho"},
        {name: "Bruna Hamori"}
    ];

    const disciplines : createDisciplineInterface[] = [
        {
        name: "HTML e CSS",
        termId: 1
        },
        {
        name: "JavaScript",
        termId: 2,
        },
        {
        name: "React",
        termId: 3,
        },
        {
        name: "Humildade",
        termId: 1,
        },
        {
        name: "Planejamento",
        termId: 2,
        },
        {
        name: "Autoconfiança",
        termId: 3,
        }
    ];

    const teachersDisciplines = [
      {
      teacherId: 1,
      disciplineId:1
      },
      {
      teacherId: 1,
      disciplineId:2
      },
      {
      teacherId: 1,
      disciplineId:3
      },
      {
      teacherId: 2,
      disciplineId:4
      },
      {
      teacherId: 2,
      disciplineId:5
      },
      {
      teacherId: 2,
      disciplineId:6
      },
    ];

    await client.terms.createMany({ data: terms });
    await client.categories.createMany({ data: categories });
    await client.teachers.createMany({ data: teachers });
    await client.disciplines.createMany({ data: disciplines });
    await client.teachersDisciplines.createMany({ data: teachersDisciplines });
}