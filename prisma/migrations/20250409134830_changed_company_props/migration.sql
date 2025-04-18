/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "ownerId",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
