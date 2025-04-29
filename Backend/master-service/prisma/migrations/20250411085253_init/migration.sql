-- CreateTable
CREATE TABLE "SupplierMaster" (
    "customerMasterID" TEXT NOT NULL,
    "supplierTypeCode" TEXT NOT NULL,
    "customerFunction" TEXT NOT NULL,
    "lifeCycleStatus" TEXT NOT NULL,
    "bankAccountType" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "freight" TEXT NOT NULL,

    CONSTRAINT "SupplierMaster_pkey" PRIMARY KEY ("customerMasterID")
);

-- CreateTable
CREATE TABLE "BusinessEntity" (
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

    CONSTRAINT "BusinessEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessEntity_businessEntityCode_key" ON "BusinessEntity"("businessEntityCode");
