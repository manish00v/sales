/*
  Warnings:

  - You are about to drop the `BusinessEntity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BusinessEntity";

-- CreateTable
CREATE TABLE "business_entities" (
    "id" SERIAL NOT NULL,
    "businessEntityCode" VARCHAR(4) NOT NULL,
    "businessEntityName" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50),
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_entities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_entities_businessEntityCode_key" ON "business_entities"("businessEntityCode");
