/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `Statistic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Statistic_userId_gameId_key" ON "Statistic"("userId", "gameId");
