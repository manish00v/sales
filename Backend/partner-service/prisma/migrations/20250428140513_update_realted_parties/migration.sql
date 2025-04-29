/*
  Warnings:

  - You are about to drop the column `sourcingTeamId` on the `RelatedParty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RelatedParty" DROP COLUMN "sourcingTeamId",
ADD COLUMN     "sourcingPersonId" VARCHAR(4);
