-- CreateTable
CREATE TABLE "delivery_locations" (
    "id" SERIAL NOT NULL,
    "deliveryLocationCode" VARCHAR(4) NOT NULL,
    "deliveryLocationName" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50),
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_locations_deliveryLocationCode_key" ON "delivery_locations"("deliveryLocationCode");
