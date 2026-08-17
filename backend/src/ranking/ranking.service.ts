import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async calculate(jobId: string, studentId: string) {
    const student = await this.prisma.user.findUnique({
      where: {
        id: studentId,
      },
      include: {
        Profile: true,
        UserSkill: true,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const job = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        JobSkill: true,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // =====================
    // GPA SCORE
    // =====================

    const gpa = student.Profile?.gpa ?? 0;

    const gpaScore = Math.min(gpa / 4, 1) * 100;

    // =====================
    // SKILL SCORE
    // =====================

    let skillScore = 100;

    if (job.JobSkill.length > 0) {
      let totalSkillScore = 0;

      for (const requiredSkill of job.JobSkill) {
        const userSkill = student.UserSkill.find(
          (skill) => skill.skillId === requiredSkill.skillId,
        );

        if (userSkill) {
          const ratio = Math.min(
            userSkill.level / requiredSkill.requiredLevel,
            1,
          );

          totalSkillScore += ratio;
        }
      }

      skillScore = (totalSkillScore / job.JobSkill.length) * 100;
    }

    // =====================
    // EXPERIENCE SCORE
    // =====================

    const months = student.Profile?.experienceMonths ?? 0;

    const experienceScore = Math.min(months / 36, 1) * 100;

    // =====================
    // JOB MATCH SCORE
    // =====================

    let jobMatchScore = 100;

    if (job.JobSkill.length > 0) {
      const matchedSkills = job.JobSkill.filter((requiredSkill) =>
        student.UserSkill.some(
          (userSkill) =>
            userSkill.skillId === requiredSkill.skillId &&
            userSkill.level >= requiredSkill.requiredLevel,
        ),
      );

      jobMatchScore = (matchedSkills.length / job.JobSkill.length) * 100;
    }

    // =====================
    // FINAL SCORE
    // =====================

    const finalScore =
      gpaScore * 0.4 +
      skillScore * 0.35 +
      experienceScore * 0.15 +
      jobMatchScore * 0.1;

    // =====================
    // SAVE RANKING
    // =====================

    const ranking = await this.prisma.ranking.upsert({
      where: {
        jobId_studentId: {
          jobId,
          studentId,
        },
      },

      update: {
        score: finalScore,
      },

      create: {
        jobId,
        studentId,
        score: finalScore,
        rank: null,
      },
    });
    return {
      student: student.name,
      job: job.title,

      gpaScore: Number(gpaScore.toFixed(2)),
      skillScore: Number(skillScore.toFixed(2)),
      experienceScore: Number(experienceScore.toFixed(2)),
      jobMatchScore: Number(jobMatchScore.toFixed(2)),
      finalScore: Number(finalScore.toFixed(2)),

      ranking,
    };
  }

  async calculateAll(jobId: string) {
    const students = await this.prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
      select: {
        id: true,
      },
    });

    for (const student of students) {
      await this.calculate(jobId, student.id);
    }

    const rankings = await this.prisma.ranking.findMany({
      where: {
        jobId,
      },
      orderBy: [
        {
          score: 'desc',
        },
        {
          calculatedAt: 'asc',
        },
      ],
    });

    await this.prisma.$transaction(
      rankings.map((ranking, index) =>
        this.prisma.ranking.update({
          where: {
            id: ranking.id,
          },
          data: {
            rank: index + 1,
          },
        }),
      ),
    );

    return {
      message: 'Ranking successfully recalculated.',
      jobId,
      processedStudents: students.length,
      totalRankings: rankings.length,
    };
  }

  async findAll() {
    const rankings = await this.prisma.ranking.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,

            Profile: {
              select: {
                gpa: true,
                experienceMonths: true,
              },
            },
          },
        },
      },

      orderBy: {
        rank: 'asc',
      },
    });

    return rankings.map((item) => ({
      rank: item.rank,

      score: Number(item.score.toFixed(2)),

      student: {
        id: item.User.id,

        name: item.User.name,

        email: item.User.email,

        gpa: item.User.Profile?.gpa,

        experience: item.User.Profile?.experienceMonths,
      },

      calculatedAt: item.calculatedAt,
    }));
  }

  async findOne(id: string) {
    const rank = await this.prisma.ranking.findUnique({
      where: {
        id,
      },
    });
    if (!rank) {
      throw new NotFoundException('Student not found');
    }

    return rank;
  }

  async findTop(jobId?: string, limit: number = 10) {
    const rankings = await this.prisma.ranking.findMany({
      where: jobId ? { jobId } : undefined,
      take: limit,
      orderBy: {
        rank: 'asc',
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            Profile: {
              select: {
                gpa: true,
                experienceMonths: true,
              },
            },
          },
        },
      },
    });

    return rankings.map((item) => ({
      rank: item.rank,
      score: Number(item.score.toFixed(2)),
      student: {
        id: item.User.id,
        name: item.User.name,
        email: item.User.email,
        gpa: item.User.Profile?.gpa ?? 0,
        experience: item.User.Profile?.experienceMonths ?? 0,
      },
    }));
  }
  async findMyRanking(userId: string) {
    const ranking = await this.prisma.ranking.findUnique({
      where: {
        id: userId,
      },

      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            Profile: {
              select: {
                gpa: true,
                experienceMonths: true,
              },
            },
          },
        },
      },
    });

    if (!ranking) {
      throw new NotFoundException('Ranking not found');
    }

    return {
      rank: ranking.rank,
      score: Number(ranking.score.toFixed(2)),
      calculatedAt: ranking.calculatedAt,

      student: {
        id: ranking.User.id,
        name: ranking.User.name,
        email: ranking.User.email,
        gpa: ranking.User.Profile?.gpa,
        experienceMonths: ranking.User.Profile?.experienceMonths,
      },
    };
  }
}
