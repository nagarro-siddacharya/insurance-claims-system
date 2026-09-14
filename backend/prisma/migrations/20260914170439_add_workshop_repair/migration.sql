-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Repair" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "workshopId" TEXT NOT NULL,
    "status" "RepairStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "expectedDeliveryDate" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "finalBillAmount" DOUBLE PRECISION,
    "repairNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repair_claimId_key" ON "Repair"("claimId");

-- CreateIndex
CREATE INDEX "Repair_workshopId_idx" ON "Repair"("workshopId");

-- CreateIndex
CREATE INDEX "Repair_status_idx" ON "Repair"("status");

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
