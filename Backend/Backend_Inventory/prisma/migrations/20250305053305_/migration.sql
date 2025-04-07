-- CreateEnum
CREATE TYPE "WarehouseType" AS ENUM ('OWNED', 'THIRDPARTY');

-- CreateTable
CREATE TABLE "Inventory" (
    "inventoryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "stockLevel" INTEGER NOT NULL,
    "reorderLevel" INTEGER NOT NULL,
    "safetyStock" INTEGER NOT NULL,
    "lotNumber" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventoryId")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "warehouseId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "warehouseName" TEXT NOT NULL,
    "warehouseAddress" TEXT NOT NULL,
    "warehouseCapacity" INTEGER NOT NULL,
    "warehouseType" "WarehouseType" NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("warehouseId")
);

-- CreateTable
CREATE TABLE "ProductMovement" (
    "movementId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "sourceLocation" TEXT NOT NULL,
    "destinationLocation" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movementDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductMovement_pkey" PRIMARY KEY ("movementId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_inventoryId_key" ON "Inventory"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_lotNumber_key" ON "Inventory"("lotNumber");

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("inventoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("inventoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("warehouseId") ON DELETE CASCADE ON UPDATE CASCADE;
