/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Workshop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workshop_name_key" ON "public"."Workshop"("name");
