/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_accessCode_key" ON "User"("accessCode");
