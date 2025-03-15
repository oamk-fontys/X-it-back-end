-- CreateEnum
CREATE TYPE "TimeSlotStatus" AS ENUM ('BOOKED', 'AVAILABLE', 'CANCELLED');

-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "status" "TimeSlotStatus" NOT NULL DEFAULT 'AVAILABLE';
