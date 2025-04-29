/*
  Warnings:

  - You are about to drop the column `sourcingUnitIds` on the `sourcing_teams` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[SourcingTeamId,sourcingUnitId]` on the table `sourcing_teams` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sourcing_teams_SourcingTeamId_sourcingUnitIds_key";

-- AlterTable
ALTER TABLE "sourcing_teams" DROP COLUMN "sourcingUnitIds",
ADD COLUMN     "sourcingUnitId" VARCHAR(4);

-- CreateIndex
CREATE UNIQUE INDEX "sourcing_teams_SourcingTeamId_sourcingUnitId_key" ON "sourcing_teams"("SourcingTeamId", "sourcingUnitId");
