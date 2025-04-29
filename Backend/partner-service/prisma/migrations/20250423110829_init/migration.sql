-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('CUSTOMER', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "PartnerCategory" AS ENUM ('INDIVIDUAL', 'BUSINESS', 'GROUP_ORGANISATION');

-- CreateEnum
CREATE TYPE "PartnerFunction" AS ENUM ('ORDERING_ENTITY', 'RECEIVING_ENTITY', 'INVOICING_ENTITY', 'PAYING_ENTITY');

-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "partnerType" TEXT NOT NULL,
    "partnerCategory" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);
