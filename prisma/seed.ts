import prisma from "./client";

async function main() {
  console.log("Seeding...");

  // --- Skills ---
  const skills = await prisma.skill.createMany({
    data: [
      { name: "React" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "TypeScript" },
      { name: "Python" },
    ],
    skipDuplicates: true,
  });

  const allSkills = await prisma.skill.findMany();

  // --- Users ---
  await prisma.user.createMany({
    data: [
      { name: "Ali", email: "ali@mail.com", password: "123", role: "STUDENT" },
      {
        name: "Vali",
        email: "vali@mail.com",
        password: "123",
        role: "STUDENT",
      },
      {
        name: "Sami",
        email: "sami@mail.com",
        password: "123",
        role: "STUDENT",
      },
    ],
    skipDuplicates: true,
  });

  const createdUsers = await prisma.user.findMany();

  // --- Profiles ---
  await prisma.profile.createMany({
    data: [
      { userId: createdUsers[0].id, gpa: 3.8, experience: 2 },
      { userId: createdUsers[1].id, gpa: 3.2, experience: 1 },
      { userId: createdUsers[2].id, gpa: 3.9, experience: 3 },
    ],
    skipDuplicates: true,
  });

  // --- User Skills ---
  await prisma.userSkill.createMany({
    data: [
      { userId: createdUsers[0].id, skillId: allSkills[0].id },
      { userId: createdUsers[0].id, skillId: allSkills[1].id },
      { userId: createdUsers[1].id, skillId: allSkills[2].id },
      { userId: createdUsers[2].id, skillId: allSkills[0].id },
      { userId: createdUsers[2].id, skillId: allSkills[3].id },
    ],
    skipDuplicates: true,
  });

  // --- Job + Job Skills ---
  const job = await prisma.job.create({
    data: {
      title: "Frontend Developer",
      description: "React developer needed",
      minGpa: 3.5,
      minExperience: 1,
    },
  });

  await prisma.jobSkill.createMany({
    data: [
      { jobId: job.id, skillId: allSkills[0].id },
      { jobId: job.id, skillId: allSkills[3].id },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding finished!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
