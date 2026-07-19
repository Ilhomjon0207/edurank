import {
    PrismaClient,
    Role,
    ApplicationStatus,
    Skill,
    User,
    Job,
} from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({
    adapter,
});
async function main() {

    // CLEAR DATABASE

    await prisma.log.deleteMany();
    await prisma.ranking.deleteMany();
    await prisma.task.deleteMany();
    await prisma.application.deleteMany();
    await prisma.jobSkill.deleteMany();
    await prisma.userSkill.deleteMany();
    await prisma.job.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.criterion.deleteMany();
    await prisma.user.deleteMany();


    // ======================
    // CRITERION
    // ======================

    await prisma.criterion.createMany({
        data: [
            {
                name: 'GPA',
                description: 'Academic performance',
                weight: 0.4,
            },
            {
                name: 'Skills',
                description: 'Technical skills',
                weight: 0.35,
            },
            {
                name: 'Experience',
                description: 'Work experience',
                weight: 0.15,
            },
            {
                name: 'Job Match',
                description: 'Job compatibility',
                weight: 0.1,
            },
        ],
    });


    // ======================
    // SKILLS
    // ======================

    const skills: Skill[] = [];

    const skillNames = [
        'Angular',
        'React',
        'NestJS',
        'Node.js',
        'Java',
        'Python',
        'SQL',
        'Docker',
        'Git',
        'TypeScript',
    ];


    for (const name of skillNames) {

        const skill =
            await prisma.skill.create({
                data: {
                    name,
                    description: faker.lorem.sentence(),
                },
            });

        skills.push(skill);
    }



    // ======================
    // USERS
    // ======================

    const students: User[] = [];


    for (let i = 0; i < 100; i++) {
        const plainPassword = faker.internet.password({
            length: 12,
            memorable: false,
        });

        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const student =
            await prisma.user.create({

                data: {

                    name:
                        faker.person.fullName(),

                    email:
                        faker.internet.email(),

                    password:
                    hashedPassword,

                    role:
                    Role.STUDENT,


                    Profile: {

                        create: {

                            gpa:
                                faker.number.float({
                                    min: 2.5,
                                    max: 4,
                                    fractionDigits: 2,
                                }),


                            experienceMonths:
                                faker.number.int({
                                    min: 0,
                                    max: 60,
                                }),


                            bio:
                                faker.lorem.sentence(),

                        },

                    },

                },

            });


        students.push(student);

    }



    // ======================
    // USER SKILL
    // ======================


    for (const student of students) {

        const randomSkills =
            faker.helpers.arrayElements(
                skills,
                3,
            );


        for (const skill of randomSkills) {

            await prisma.userSkill.create({

                data: {

                    userId:
                    student.id,

                    skillId:
                    skill.id,

                    level:
                        faker.number.int({
                            min: 1,
                            max: 5,
                        }),

                },

            });

        }

    }



    // ======================
    // JOB
    // ======================


    const jobs: Job[] = [];


    for (let i = 0; i < 30; i++) {


        const job =
            await prisma.job.create({

                data: {

                    title:
                        faker.person.jobTitle(),


                    description:
                        faker.lorem.paragraph(),


                    minGpa:
                        faker.number.float({
                            min: 2.5,
                            max: 4,
                            fractionDigits: 1,
                        }),


                    minExperience:
                        faker.number.int({
                            min: 0,
                            max: 36,
                        }),

                },

            });


        jobs.push(job);

    }



    // ======================
    // JOB SKILL
    // ======================


    for (const job of jobs) {


        const randomSkills =
            faker.helpers.arrayElements(
                skills,
                3,
            );


        for (const skill of randomSkills) {


            await prisma.jobSkill.create({

                data: {

                    jobId:
                    job.id,


                    skillId:
                    skill.id,


                    requiredLevel:
                        faker.number.int({
                            min: 1,
                            max: 5,
                        }),

                },

            });


        }

    }




    // ======================
    // APPLICATION
    // ======================


    const applicationPairs = new Set<string>();


    while (applicationPairs.size < 200) {


        const student =
            faker.helpers.arrayElement(
                students,
            );


        const job =
            faker.helpers.arrayElement(
                jobs,
            );


        const key =
            `${student.id}-${job.id}`;


        if (applicationPairs.has(key)) {
            continue;
        }


        applicationPairs.add(key);


        await prisma.application.create({

            data: {

                userId:
                student.id,


                jobId:
                job.id,


                status:
                    faker.helpers.arrayElement([
                        ApplicationStatus.PENDING,
                        ApplicationStatus.ACCEPTED,
                        ApplicationStatus.REJECTED,
                    ]),

            },

        });


    }




    // ======================
    // RANKING
    // ======================


    for (const student of students) {


        await prisma.ranking.create({

            data: {

                studentId:
                student.id,


                score:
                    faker.number.float({
                        min: 0,
                        max: 100,
                        fractionDigits: 2,
                    }),


                rank:
                    null,

            },

        });


    }




    // ======================
    // TASK
    // ======================


    for (let i = 0; i < 100; i++) {


        await prisma.task.create({

            data: {

                title:
                    faker.lorem.words(3),


                description:
                    faker.lorem.sentence(),


                studentId:
                faker.helpers.arrayElement(
                    students,
                ).id,


                score:
                    faker.number.float({
                        min: 0,
                        max: 100,
                        fractionDigits: 2,
                    }),

            },

        });


    }



    // ======================
    // LOG
    // ======================


    for (const student of students) {


        await prisma.log.create({

            data: {

                userId:
                student.id,


                action:
                    'Seed created user',

            },

        });


    }


    console.log('Seed completed ✅');

}



main()
    .catch((error) => {

        console.error(error);

        process.exit(1);

    })
    .finally(async () => {

        await prisma.$disconnect();

    });