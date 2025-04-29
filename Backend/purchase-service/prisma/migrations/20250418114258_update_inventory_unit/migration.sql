/*
  Warnings:

  - You are about to drop the `InventoryUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InventoryUnit";

-- CreateTable
CREATE TABLE "inventory_units" (
    "id" TEXT NOT NULL,
    "InventoryUnitId" VARCHAR(4) NOT NULL,
    "InventoryUnitName" VARCHAR(30) NOT NULL,
    "InventoryControl" VARCHAR(30) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "factoryUnitCode" VARCHAR(4),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventory_units_InventoryUnitId_key" ON "inventory_units"("InventoryUnitId");
