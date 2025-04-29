/*
  Warnings:

  - You are about to drop the `InventoryBay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InventoryBay";

-- CreateTable
CREATE TABLE "inventory_bays" (
    "id" TEXT NOT NULL,
    "InventoryBayId" VARCHAR(4) NOT NULL,
    "InventoryBayName" VARCHAR(30) NOT NULL,
    "StockingType" VARCHAR(20) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "inventoryUnitIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_bays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventory_bays_InventoryBayId_key" ON "inventory_bays"("InventoryBayId");
