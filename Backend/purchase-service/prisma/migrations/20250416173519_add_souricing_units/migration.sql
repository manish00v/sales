/*
  Warnings:

  - You are about to drop the `SourcingUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SourcingUnit";

-- CreateTable
CREATE TABLE "sourcing_units" (
    "id" TEXT NOT NULL,
    "SourcingUnitId" VARCHAR(4) NOT NULL,
    "SourcingUnitDesc" VARCHAR(30) NOT NULL,
    "factoryUnitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sourcing_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sourcing_units_SourcingUnitId_factoryUnitId_key" ON "sourcing_units"("SourcingUnitId", "factoryUnitId");
