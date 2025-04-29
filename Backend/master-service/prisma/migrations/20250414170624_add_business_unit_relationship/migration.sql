/*
  Warnings:

  - You are about to drop the `BusinessUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessUnit" DROP CONSTRAINT "BusinessUnit_businessEntityCode_fkey";

-- DropTable
DROP TABLE "BusinessUnit";

-- CreateTable
CREATE TABLE "business_units" (
    "id" SERIAL NOT NULL,
    "businessUnitCode" VARCHAR(4) NOT NULL,
    "businessUnitDesc" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50),
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessEntityId" INTEGER NOT NULL,
    "factoryUnitId" INTEGER,
    "salesChannelId" INTEGER,
    "salesOfficeId" INTEGER,

    CONSTRAINT "business_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_units_businessUnitCode_key" ON "business_units"("businessUnitCode");

-- CreateIndex
CREATE UNIQUE INDEX "business_units_businessEntityId_factoryUnitId_key" ON "business_units"("businessEntityId", "factoryUnitId");

-- CreateIndex
CREATE UNIQUE INDEX "business_units_salesChannelId_salesOfficeId_key" ON "business_units"("salesChannelId", "salesOfficeId");

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_businessEntityId_fkey" FOREIGN KEY ("businessEntityId") REFERENCES "business_entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_factoryUnitId_fkey" FOREIGN KEY ("factoryUnitId") REFERENCES "factory_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_salesChannelId_fkey" FOREIGN KEY ("salesChannelId") REFERENCES "sales_channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_salesOfficeId_fkey" FOREIGN KEY ("salesOfficeId") REFERENCES "sales_offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
