/*
  Warnings:

  - A unique constraint covering the columns `[jobId,studentId]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobId` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_studentId_fkey";

-- AlterTable
ALTER TABLE "Ranking" ADD COLUMN     "jobId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Ranking_jobId_idx" ON "Ranking"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_jobId_studentId_key" ON "Ranking"("jobId", "studentId");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
