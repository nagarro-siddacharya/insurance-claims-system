-- CreateEnum
CREATE TYPE "public"."SurveyStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Survey" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "surveyorId" TEXT NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION,
    "reportPath" TEXT,
    "status" "public"."SurveyStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_claimId_key" ON "public"."Survey"("claimId");

-- AddForeignKey
ALTER TABLE "public"."Survey" ADD CONSTRAINT "Survey_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "public"."Claim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Survey" ADD CONSTRAINT "Survey_surveyorId_fkey" FOREIGN KEY ("surveyorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
