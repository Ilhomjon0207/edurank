import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class RecommendationsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getStudentRecommendations(studentId: string) {
    const student = await this.prisma.user.findUnique({
      where: {
        id: studentId,
      },
      include: {
        UserSkill: {
          include: {
            Skill: true,
          },
        },
        Profile: true,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const studentSkills = student.UserSkill.map((item) => item.skillId);

    const jobs = await this.prisma.job.findMany({
      include: {
        JobSkill: {
          include: {
            Skill: true,
          },
        },
      },
    });

    const result = jobs.map((job) => {
      const requiredSkills = job.JobSkill.map((item) => item.skillId);

      const matchedSkills = requiredSkills.filter((skillId) =>
        studentSkills.includes(skillId),
      );

      const skillScore =
        requiredSkills.length === 0
          ? 0
          : (matchedSkills.length / requiredSkills.length) * 100;

      const studentGpa = student.Profile?.gpa ?? 0;

      const gpaScore = job.minGpa
        ? Math.min((studentGpa / job.minGpa) * 100, 100)
        : 100;

      const experience = student.Profile?.experienceMonths ?? 0;

      const experienceScore = job.minExperience
        ? Math.min((experience / job.minExperience) * 100, 100)
        : 100;

      const matchScore = Math.round(
        skillScore * 0.6 + gpaScore * 0.2 + experienceScore * 0.2,
      );

      return {
        jobId: job.id,
        title: job.title,
        matchScore,
        matchedSkillsCount: matchedSkills.length,
        requiredSkillsCount: requiredSkills.length,

        details: {
          skillScore: Math.round(skillScore),
          gpaScore: Math.round(gpaScore),
          experienceScore: Math.round(experienceScore),
        },
      };
    });

    return result.sort((a, b) => b.matchScore - a.matchScore);
  }

  async aiRecommendation(studentId: string) {
    const recommendations = await this.getStudentRecommendations(studentId);

    const student = await this.prisma.user.findUnique({
      where: {
        id: studentId,
      },
      include: {
        Profile: true,
        UserSkill: {
          include: {
            Skill: true,
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const data = {
      student: {
        name: student.name,
        gpa: student.Profile?.gpa,
        experience: student.Profile?.experienceMonths,
        skills: student.UserSkill.map((s) => s.Skill.name),
      },

      recommendations: recommendations.slice(0, 5),
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.aiService.analyzeStudent(data);
  }
}
