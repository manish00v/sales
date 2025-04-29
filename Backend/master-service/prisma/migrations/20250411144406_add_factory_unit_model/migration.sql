-- CreateTable
CREATE TABLE "factory_units" (
    "id" SERIAL NOT NULL,
    "factoryUnitCode" VARCHAR(4) NOT NULL,
    "factoryUnitName" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50),
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "factoryPhone" VARCHAR(10) NOT NULL,
    "mobileNumber" VARCHAR(10) NOT NULL,
    "factoryEmail" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "factory_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "factory_units_factoryUnitCode_key" ON "factory_units"("factoryUnitCode");
