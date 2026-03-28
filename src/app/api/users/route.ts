import prisma from "../../../../prisma/client";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      skills: { include: { skill: true } },
    },
  });

  return Response.json(users);
}
