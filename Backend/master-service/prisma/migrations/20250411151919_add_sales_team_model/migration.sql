-- CreateTable
CREATE TABLE "sales_teams" (
    "id" SERIAL NOT NULL,
    "salesTeamCode" VARCHAR(4) NOT NULL,
    "salesTeamName" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_teams_salesTeamCode_key" ON "sales_teams"("salesTeamCode");
