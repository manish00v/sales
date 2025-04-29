-- CreateTable
CREATE TABLE "SourcingTeam" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourcingTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SourcingTeam_SourcingTeamId_key" ON "SourcingTeam"("SourcingTeamId");
