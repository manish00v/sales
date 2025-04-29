-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street1" VARCHAR(50),
    "street2" VARCHAR(50),
    "city" VARCHAR(20),
    "region" VARCHAR(20),
    "country" VARCHAR(20),
    "pinCode" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
