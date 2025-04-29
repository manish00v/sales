/*
  Warnings:

  - A unique constraint covering the columns `[businessEntityId,factoryUnitId]` on the table `business_units` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[salesChannelId,salesOfficeId]` on the table `business_units` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "business_units" ADD COLUMN     "factoryUnitId" INTEGER,
ADD COLUMN     "salesChannelId" INTEGER,
ADD COLUMN     "salesOfficeId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "business_units_businessEntityId_factoryUnitId_key" ON "business_units"("businessEntityId", "factoryUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "business_units_salesChannelId_salesOfficeId_key" ON "business_units"("salesChannelId", "salesOfficeId");

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_factoryUnitId_fkey" FOREIGN KEY ("factoryUnitId") REFERENCES "factory_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_salesChannelId_fkey" FOREIGN KEY ("salesChannelId") REFERENCES "sales_channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_salesOfficeId_fkey" FOREIGN KEY ("salesOfficeId") REFERENCES "sales_offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
