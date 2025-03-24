/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `LineItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SalesOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SalesPerson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[emailId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailId]` on the table `SalesPerson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_customerId_fkey";

-- DropForeignKey
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "SalesOrder" DROP CONSTRAINT "SalesOrder_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SalesPerson" DROP CONSTRAINT "SalesPerson_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SalesPerson" DROP CONSTRAINT "SalesPerson_orderId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "orderId",
DROP COLUMN "productId",
ALTER COLUMN "customerId" DROP DEFAULT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId");
DROP SEQUENCE "Customer_customerId_seq";

-- AlterTable
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_pkey",
ALTER COLUMN "orderLineItemId" DROP DEFAULT,
ALTER COLUMN "orderLineItemId" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LineItems_pkey" PRIMARY KEY ("orderLineItemId");
DROP SEQUENCE "LineItems_orderLineItemId_seq";

-- AlterTable
ALTER TABLE "SalesOrder" DROP CONSTRAINT "SalesOrder_pkey",
ALTER COLUMN "orderId" DROP DEFAULT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("orderId");
DROP SEQUENCE "SalesOrder_orderId_seq";

-- AlterTable
ALTER TABLE "SalesPerson" DROP CONSTRAINT "SalesPerson_pkey",
ALTER COLUMN "salesPersonId" DROP DEFAULT,
ALTER COLUMN "salesPersonId" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SalesPerson_pkey" PRIMARY KEY ("salesPersonId");
DROP SEQUENCE "SalesPerson_salesPersonId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_emailId_key" ON "Customer"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesPerson_emailId_key" ON "SalesPerson"("emailId");

-- AddForeignKey
ALTER TABLE "SalesOrder" ADD CONSTRAINT "SalesOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItems" ADD CONSTRAINT "LineItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItems" ADD CONSTRAINT "LineItems_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPerson" ADD CONSTRAINT "SalesPerson_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPerson" ADD CONSTRAINT "SalesPerson_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
