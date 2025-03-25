/*
  Warnings:

  - You are about to drop the column `companyId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "logoId" TEXT;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
