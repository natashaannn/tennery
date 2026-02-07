/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `facilities` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FacilityCategory" AS ENUM ('PRIMARY', 'SECONDARY');

-- CreateEnum
CREATE TYPE "BookerType" AS ENUM ('RESIDENT', 'PUBLIC');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_userId_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "bookerEmail" TEXT,
ADD COLUMN     "bookerName" TEXT,
ADD COLUMN     "bookerPhone" TEXT,
ADD COLUMN     "bookerType" "BookerType" NOT NULL DEFAULT 'RESIDENT',
ADD COLUMN     "hoursBooked" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "isCustomTime" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFreeQuota" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oderId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "facilities" DROP COLUMN "hourlyRate",
ADD COLUMN     "category" "FacilityCategory" NOT NULL DEFAULT 'PRIMARY',
ADD COLUMN     "freeQuotaPerMonth" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "publicHourlyRate" DOUBLE PRECISION NOT NULL DEFAULT 25,
ADD COLUMN     "residentChargeAfterQuota" DOUBLE PRECISION NOT NULL DEFAULT 20;

-- CreateTable
CREATE TABLE "facility_time_slots" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facility_time_slots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "facility_time_slots" ADD CONSTRAINT "facility_time_slots_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
