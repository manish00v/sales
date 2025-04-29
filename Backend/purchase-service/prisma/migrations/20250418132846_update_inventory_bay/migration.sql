/*
  Warnings:

  - You are about to drop the column `inventoryUnitIds` on the `inventory_bays` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[InventoryBayId,inventoryUnitId]` on the table `inventory_bays` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "inventory_bays_InventoryBayId_key";

-- AlterTable
ALTER TABLE "inventory_bays" DROP COLUMN "inventoryUnitIds",
ADD COLUMN     "inventoryUnitId" VARCHAR(4);

-- CreateIndex
CREATE UNIQUE INDEX "inventory_bays_InventoryBayId_inventoryUnitId_key" ON "inventory_bays"("InventoryBayId", "inventoryUnitId");
