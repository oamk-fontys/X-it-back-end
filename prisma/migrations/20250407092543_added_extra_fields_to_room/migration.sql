/*
  Warnings:

  - Added the required column `address` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;
