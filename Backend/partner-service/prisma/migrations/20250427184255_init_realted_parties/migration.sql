-- CreateTable
CREATE TABLE "RelatedParty" (
    "id" TEXT NOT NULL,
    "OrderingParty" VARCHAR(20) NOT NULL,
    "ReceivingParty" VARCHAR(20) NOT NULL,
    "InvoicingParty" VARCHAR(20) NOT NULL,
    "PayingParty" VARCHAR(20) NOT NULL,
    "GroupOrganisation" VARCHAR(20) NOT NULL,
    "SalesPersonId" VARCHAR(4) NOT NULL,
    "SourcingTeamId" VARCHAR(4) NOT NULL,
    "ContactPersonId" VARCHAR(4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelatedParty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelatedParty_SalesPersonId_key" ON "RelatedParty"("SalesPersonId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedParty_SourcingTeamId_key" ON "RelatedParty"("SourcingTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedParty_ContactPersonId_key" ON "RelatedParty"("ContactPersonId");
