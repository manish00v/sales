-- AddForeignKey
ALTER TABLE "inventory_bays" ADD CONSTRAINT "inventory_bays_inventoryUnitId_fkey" FOREIGN KEY ("inventoryUnitId") REFERENCES "inventory_units"("InventoryUnitId") ON DELETE SET NULL ON UPDATE CASCADE;
