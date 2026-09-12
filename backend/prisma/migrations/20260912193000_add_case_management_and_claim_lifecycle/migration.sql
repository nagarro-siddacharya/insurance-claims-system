-- Expand claim lifecycle to represent the business process explicitly.
ALTER TYPE "public"."ClaimStatus" RENAME TO "ClaimStatus_old";
CREATE TYPE "public"."ClaimStatus" AS ENUM ('SUBMITTED', 'CASE_ASSIGNED', 'SURVEY_PENDING', 'SURVEY_COMPLETED', 'ADJUDICATION_PENDING', 'APPROVED', 'REJECTED', 'REPAIR_IN_PROGRESS', 'REPAIR_COMPLETED', 'PAYMENT_PENDING', 'CLOSED');
ALTER TABLE "public"."Claim" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Claim" ALTER COLUMN "status" TYPE "public"."ClaimStatus" USING ("status"::text::"public"."ClaimStatus");
ALTER TABLE "public"."Claim" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
DROP TYPE "public"."ClaimStatus_old";

CREATE TABLE "public"."CaseAssignment" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "caseManagerId" TEXT NOT NULL,
    "surveyorId" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CaseAssignment_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "CaseAssignment_claimId_key" ON "public"."CaseAssignment"("claimId");
CREATE INDEX "CaseAssignment_caseManagerId_idx" ON "public"."CaseAssignment"("caseManagerId");
CREATE INDEX "CaseAssignment_surveyorId_idx" ON "public"."CaseAssignment"("surveyorId");
ALTER TABLE "public"."CaseAssignment" ADD CONSTRAINT "CaseAssignment_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "public"."Claim"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."CaseAssignment" ADD CONSTRAINT "CaseAssignment_caseManagerId_fkey" FOREIGN KEY ("caseManagerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."CaseAssignment" ADD CONSTRAINT "CaseAssignment_surveyorId_fkey" FOREIGN KEY ("surveyorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
