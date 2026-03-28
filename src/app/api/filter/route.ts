import prisma from "../../../../prisma/client";

export async function POST(req: Request) {
  const { jobId } = await req.json();

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { skills: true },
  });

  const candidates = await prisma.user.findMany({
    where: {
      role: "STUDENT",
      profile: {
        gpa: job?.minGpa ? { gte: job.minGpa } : undefined,
        experience: job?.minExperience ? { gte: job.minExperience } : undefined,
      },
      skills: {
        some: {
          skillId: {
            in: job?.skills.map((s) => s.skillId),
          },
        },
      },
    },
    include: {
      profile: true,
      skills: { include: { skill: true } },
    },
  });

  // 🔥 ВОТ СЮДА ДОБАВЛЯЕМ РАНЖИРОВАНИЕ
  const ranked = candidates
    .map((c) => {
      let score = 0;

      if (c.profile?.gpa) score += c.profile.gpa * 10;
      if (c.profile?.experience) score += c.profile.experience * 20;

      const matchedSkills = c.skills.filter((s) =>
        job?.skills.some((js) => js.skillId === s.skillId),
      ).length;

      score += matchedSkills * 30;

      return {
        ...c,
        matchScore: score,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  // 🔥 И возвращаем ranked, а не candidates
  return Response.json(ranked);
}
