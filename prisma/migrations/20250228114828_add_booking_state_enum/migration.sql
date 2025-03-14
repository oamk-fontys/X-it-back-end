-- CreateEnum
CREATE TYPE "BookingState" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'DONE', 'CANCELLED');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "state" "BookingState" NOT NULL DEFAULT 'SCHEDULED';
