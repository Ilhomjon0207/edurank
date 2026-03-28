import prisma from "../../../../prisma/client";

export async function POST(req: Request) {
  const body = await req.json();

  const job = await prisma.job.create({
    data: {
      title: body.title,
      description: body.description,
      minGpa: body.minGpa,
      minExperience: body.minExperience,
    },
  });

  return Response.json(job);
}
