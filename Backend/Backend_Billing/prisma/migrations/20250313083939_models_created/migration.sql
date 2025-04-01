-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'HALF_PAYMENT', 'Full_PAID');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('ONLINE', 'CASH');

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentMode" "PaymentMode" NOT NULL,
    "transactionRef" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "Tax" (
    "taxId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "taxType" TEXT NOT NULL,
    "taxPercentage" TEXT NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("taxId")
);

-- CreateTable
CREATE TABLE "CurrencyExchangeRate" (
    "exchangeId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrencyExchangeRate_pkey" PRIMARY KEY ("exchangeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceId_key" ON "Invoice"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentId_key" ON "Payment"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Tax_taxId_key" ON "Tax"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyExchangeRate_exchangeId_key" ON "CurrencyExchangeRate"("exchangeId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tax" ADD CONSTRAINT "Tax_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyExchangeRate" ADD CONSTRAINT "CurrencyExchangeRate_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;
