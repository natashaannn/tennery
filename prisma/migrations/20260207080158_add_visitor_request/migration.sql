-- CreateEnum
CREATE TYPE "VisitorRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "visitor_requests" (
    "id" TEXT NOT NULL,
    "requestCode" TEXT NOT NULL,
    "accessPointId" TEXT NOT NULL,
    "targetUnit" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitorPhone" TEXT,
    "purpose" TEXT,
    "status" "VisitorRequestStatus" NOT NULL DEFAULT 'PENDING',
    "respondedById" TEXT,
    "respondedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitor_requests_requestCode_key" ON "visitor_requests"("requestCode");

-- AddForeignKey
ALTER TABLE "visitor_requests" ADD CONSTRAINT "visitor_requests_accessPointId_fkey" FOREIGN KEY ("accessPointId") REFERENCES "access_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitor_requests" ADD CONSTRAINT "visitor_requests_respondedById_fkey" FOREIGN KEY ("respondedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
