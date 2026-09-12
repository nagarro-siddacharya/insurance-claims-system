-- CreateTable
CREATE TABLE "Adjudication" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "adjusterId" TEXT NOT NULL,
    "decision" "ClaimStatus" NOT NULL,
    "approvedAmount" DOUBLE PRECISION,
    "decisionReason" TEXT NOT NULL,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adjudication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adjudication_claimId_key" ON "Adjudication"("claimId");
CREATE INDEX "Adjudication_adjusterId_idx" ON "Adjudication"("adjusterId");

-- AddForeignKey
ALTER TABLE "Adjudication" ADD CONSTRAINT "Adjudication_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Adjudication" ADD CONSTRAINT "Adjudication_adjusterId_fkey" FOREIGN KEY ("adjusterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
