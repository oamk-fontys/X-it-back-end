/*
  Warnings:

  - You are about to drop the column `status` on the `TimeSlot` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "BookingState" ADD VALUE 'BLOCKED';

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "status",
ADD COLUMN     "bookingId" TEXT;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
