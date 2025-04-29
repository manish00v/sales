-- CreateTable
CREATE TABLE "InventoryUnit" (
    "id" TEXT NOT NULL,
    "InventoryUnitId" VARCHAR(4) NOT NULL,
    "InventoryUnitName" VARCHAR(30) NOT NULL,
    "InventoryControl" VARCHAR(30) NOT NULL,
    "StreetAddress" VARCHAR(50) NOT NULL,
    "City" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(20) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryUnit_InventoryUnitId_key" ON "InventoryUnit"("InventoryUnitId");
