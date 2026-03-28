-- AlterTable
ALTER TABLE "User" ADD COLUMN     "criterionId" INTEGER;

-- CreateTable
CREATE TABLE "Criterion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Criterion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
