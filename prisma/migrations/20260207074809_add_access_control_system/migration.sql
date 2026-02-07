-- CreateEnum
CREATE TYPE "AccessPointType" AS ENUM ('MAIN_LOBBY', 'SIDE_ENTRANCE', 'CAR_PARK', 'POOL_AREA', 'GYM');

-- CreateEnum
CREATE TYPE "AccessPointStatus" AS ENUM ('ONLINE', 'OFFLINE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "VisitorInviteStatus" AS ENUM ('PENDING', 'ACTIVE', 'USED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AccessLogAction" AS ENUM ('UNLOCK_REQUEST', 'UNLOCK_SUCCESS', 'UNLOCK_FAILED', 'VISITOR_CHECKIN', 'VISITOR_CHECKOUT', 'EMERGENCY_UNLOCK', 'SYSTEM_LOCK');

-- CreateTable
CREATE TABLE "access_points" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AccessPointType" NOT NULL,
    "location" TEXT,
    "deviceId" TEXT,
    "status" "AccessPointStatus" NOT NULL DEFAULT 'OFFLINE',
    "lastHeartbeat" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "access_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_invites" (
    "id" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "hostUserId" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitorPhone" TEXT,
    "visitorEmail" TEXT,
    "purpose" TEXT,
    "vehiclePlate" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "maxEntries" INTEGER NOT NULL DEFAULT 1,
    "entriesUsed" INTEGER NOT NULL DEFAULT 0,
    "status" "VisitorInviteStatus" NOT NULL DEFAULT 'PENDING',
    "notifyOnArrival" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitor_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_access_points" (
    "id" TEXT NOT NULL,
    "visitorInviteId" TEXT NOT NULL,
    "accessPointId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_access_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_logs" (
    "id" TEXT NOT NULL,
    "accessPointId" TEXT NOT NULL,
    "userId" TEXT,
    "visitorInviteId" TEXT,
    "action" "AccessLogAction" NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitor_invites_inviteCode_key" ON "visitor_invites"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "visitor_access_points_visitorInviteId_accessPointId_key" ON "visitor_access_points"("visitorInviteId", "accessPointId");

-- AddForeignKey
ALTER TABLE "visitor_invites" ADD CONSTRAINT "visitor_invites_hostUserId_fkey" FOREIGN KEY ("hostUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitor_access_points" ADD CONSTRAINT "visitor_access_points_visitorInviteId_fkey" FOREIGN KEY ("visitorInviteId") REFERENCES "visitor_invites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitor_access_points" ADD CONSTRAINT "visitor_access_points_accessPointId_fkey" FOREIGN KEY ("accessPointId") REFERENCES "access_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_accessPointId_fkey" FOREIGN KEY ("accessPointId") REFERENCES "access_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_visitorInviteId_fkey" FOREIGN KEY ("visitorInviteId") REFERENCES "visitor_invites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
