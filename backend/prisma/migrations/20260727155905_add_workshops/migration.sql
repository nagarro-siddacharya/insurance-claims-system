-- AlterTable
ALTER TABLE "public"."Claim" ADD COLUMN     "workshopId" TEXT;

-- CreateTable
CREATE TABLE "public"."Workshop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Claim" ADD CONSTRAINT "Claim_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "public"."Workshop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
