/*
  Warnings:

  - You are about to drop the column `bookingId` on the `TimeSlot` table. All the data in the column will be lost.
  - Added the required column `timeSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_bookingId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "timeSlotId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "bookingId";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
