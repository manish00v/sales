/*
  Warnings:

  - You are about to drop the `SourcingPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SourcingPerson";

-- CreateTable
CREATE TABLE "sourcing_persons" (
    "id" TEXT NOT NULL,
    "sourcingPersonName" VARCHAR(30) NOT NULL,
    "sourcingPersonRole" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sourcing_persons_pkey" PRIMARY KEY ("id")
);
