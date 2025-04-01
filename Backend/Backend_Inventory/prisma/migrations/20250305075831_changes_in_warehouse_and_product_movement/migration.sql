/*
  Warnings:

  - A unique constraint covering the columns `[movementId]` on the table `ProductMovement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[warehouseId]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductMovement_movementId_key" ON "ProductMovement"("movementId");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_warehouseId_key" ON "Warehouse"("warehouseId");
