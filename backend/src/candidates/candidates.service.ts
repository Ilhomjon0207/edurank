import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {AiService} from "../ai/ai.service";

@Injectable()
export class CandidatesService {

    constructor(
        private prisma: PrismaService, private aiService: AiService
    ){}


    async getJobCandidates(jobId:number){

        const job =
            await this.prisma.job.findUnique({

                where:{
                    id: jobId
                },

                include:{
                    JobSkill:true
                }

            });


        if(!job){
            throw new NotFoundException(
                "Job not found"
            );
        }



        const students =
            await this.prisma.user.findMany({

                where:{
                    role:'STUDENT'
                },

                include:{
                    Profile:true,

                    UserSkill:true,

                    Ranking:{
                        orderBy:{
                            calculatedAt:'desc'
                        },
                        take:1
                    }

                }

            });



        const requiredSkills =
            job.JobSkill.map(
                item => item.skillId
            );



        const result =
            students.map(student=>{


                const studentSkills =
                    student.UserSkill.map(
                        item=>item.skillId
                    );



                const matchedSkills =
                    requiredSkills.filter(
                        skillId =>
                            studentSkills.includes(skillId)
                    );



                const skillScore =
                    requiredSkills.length === 0
                        ? 0
                        :
                        (
                            matchedSkills.length /
                            requiredSkills.length
                        ) * 100;



                const gpa =
                    student.Profile?.gpa ?? 0;



                const gpaScore =
                    job.minGpa
                        ?
                        Math.min(
                            (gpa / job.minGpa)*100,
                            100
                        )
                        :
                        100;



                const experience =
                    student.Profile?.experienceMonths ?? 0;



                const experienceScore =
                    job.minExperience
                        ?
                        Math.min(
                            (
                                experience /
                                job.minExperience
                            )*100,
                            100
                        )
                        :
                        100;



                const score =
                    Math.round(

                        skillScore * 0.6 +
                        gpaScore * 0.2 +
                        experienceScore * 0.2

                    );



                return {

                    studentId: student.id,

                    name: student.name,

                    score,

                    matchedSkills:
                    matchedSkills.length,

                    requiredSkills:
                    requiredSkills.length,

                    ranking:
                        student.Ranking[0]?.score ?? 0

                };


            });



        return result.sort(
            (a,b)=>
                b.score-a.score
        );

    }

    async analyzeCandidates(jobId:number){

        const candidates =
            await this.getJobCandidates(jobId);


        const job =
            await this.prisma.job.findUnique({

                where:{
                    id: jobId
                }

            });

        const bestCandidate = candidates[0];

        const aiData = {
            candidate: {
                name: bestCandidate.name,
                score: bestCandidate.score,
                matchedSkills: bestCandidate.matchedSkills,
                requiredSkills: bestCandidate.requiredSkills,
                ranking: bestCandidate.ranking
            },

            job:{
                title: job?.title
            }
        };
        const data = {

            job:{
                id: job?.id,
                title: job?.title
            },


            candidates:
                candidates.slice(0,10)

        };


        return this.aiService.analyzeCandidates(aiData);

    }

}