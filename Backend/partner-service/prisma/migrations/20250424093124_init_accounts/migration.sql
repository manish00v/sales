-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'EURO', 'USD');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CARD', 'DIGITAL_PAYMENT', 'PLATFORMS');

-- CreateEnum
CREATE TYPE "InvoicingMethod" AS ENUM ('EMAIL', 'E_INVOICE', 'POST');

-- CreateEnum
CREATE TYPE "CreditStatus" AS ENUM ('PAY_IN_ADVANCE', 'OUTSTANDING_PAYMENTS');

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "businessEntityCode" VARCHAR(4) NOT NULL,
    "accountReceivableGL" VARCHAR(4) NOT NULL,
    "accountPayableGL" VARCHAR(4) NOT NULL,
    "gstin" VARCHAR(20) NOT NULL,
    "vatNumber" VARCHAR(15) NOT NULL,
    "pan" VARCHAR(10) NOT NULL,
    "tan" VARCHAR(10) NOT NULL,
    "currency" VARCHAR(30) NOT NULL,
    "paymentMethod" VARCHAR(10) NOT NULL,
    "invoicingMethod" VARCHAR(10) NOT NULL,
    "paymentToleranceDays" INTEGER NOT NULL,
    "creditStatus" VARCHAR(30) NOT NULL,
    "accountantPhone" VARCHAR(30) NOT NULL,
    "accountantEmail" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
