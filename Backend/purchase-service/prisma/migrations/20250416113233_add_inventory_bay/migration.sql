-- CreateTable
CREATE TABLE "InventoryBay" (
    "id" TEXT NOT NULL,
    "InventoryBayId" VARCHAR(4) NOT NULL,
    "InventoryBayName" VARCHAR(30) NOT NULL,
    "StockingType" VARCHAR(20) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryBay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryBay_InventoryBayId_key" ON "InventoryBay"("InventoryBayId");
