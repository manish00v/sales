/*
  Warnings:

  - You are about to drop the column `salesPersonCode` on the `RelatedParty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RelatedParty" DROP COLUMN "salesPersonCode",
ADD COLUMN     "salesPersonId" VARCHAR(4);
