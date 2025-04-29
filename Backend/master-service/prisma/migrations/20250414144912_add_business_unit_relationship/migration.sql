/*
  Warnings:

  - You are about to drop the `business_units` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_businessEntityId_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_factoryUnitId_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_salesChannelId_fkey";

-- DropForeignKey
ALTER TABLE "business_units" DROP CONSTRAINT "business_units_salesOfficeId_fkey";

-- DropTable
DROP TABLE "business_units";

-- CreateTable
CREATE TABLE "BusinessUnit" (
    "id" TEXT NOT NULL,
    "businessUnitCode" VARCHAR(4) NOT NULL,
    "description" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50) NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "factoryUnitCode" TEXT,
    "salesChannel" TEXT,
    "salesOffice" TEXT,
    "businessEntityCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUnit_businessUnitCode_key" ON "BusinessUnit"("businessUnitCode");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUnit_businessEntityCode_factoryUnitCode_key" ON "BusinessUnit"("businessEntityCode", "factoryUnitCode");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUnit_salesChannel_salesOffice_key" ON "BusinessUnit"("salesChannel", "salesOffice");

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_businessEntityCode_fkey" FOREIGN KEY ("businessEntityCode") REFERENCES "business_entities"("businessEntityCode") ON DELETE RESTRICT ON UPDATE CASCADE;
