-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('CURRENT', 'SAVINGS');

-- CreateTable
CREATE TABLE "bank_details" (
    "id" SERIAL NOT NULL,
    "accountType" VARCHAR(10) NOT NULL,
    "bankName" VARCHAR(40) NOT NULL,
    "holderName" VARCHAR(40) NOT NULL,
    "branchName" VARCHAR(40) NOT NULL,
    "addressLine1" VARCHAR(50) NOT NULL,
    "addressLine2" VARCHAR(50),
    "city" VARCHAR(40) NOT NULL,
    "state" VARCHAR(40) NOT NULL,
    "country" VARCHAR(40) NOT NULL,
    "pinCode" VARCHAR(10) NOT NULL,
    "ifscCode" VARCHAR(20) NOT NULL,
    "micrCode" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_details_pkey" PRIMARY KEY ("id")
);
