/*
  Warnings:

  - You are about to drop the `SourcingTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SourcingTeam";

-- CreateTable
CREATE TABLE "sourcing_teams" (
    "id" TEXT NOT NULL,
    "SourcingTeamId" VARCHAR(4) NOT NULL,
    "SourcingTeamName" VARCHAR(30) NOT NULL,
    "TeamType" VARCHAR(20) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "CountryCode" VARCHAR(5) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "PhoneNumber" VARCHAR(12) NOT NULL,
    "LandlineNumber" VARCHAR(12) NOT NULL,
    "Email" VARCHAR(20) NOT NULL,
    "sourcingUnitIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sourcing_teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sourcing_teams_SourcingTeamId_key" ON "sourcing_teams"("SourcingTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "sourcing_teams_SourcingTeamId_sourcingUnitIds_key" ON "sourcing_teams"("SourcingTeamId", "sourcingUnitIds");
