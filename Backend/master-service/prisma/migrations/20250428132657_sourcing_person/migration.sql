-- CreateTable
CREATE TABLE "SourcingPerson" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50) NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "phoneNumber" VARCHAR(10) NOT NULL,
    "mobileNumber" VARCHAR(10) NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "department" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourcingPerson_pkey" PRIMARY KEY ("id")
);
