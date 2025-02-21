-- CreateEnum
CREATE TYPE "BookingState" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'DONE', 'CANCELLEDAT', 'UPDATEDAT', 'CREATEDAT');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
