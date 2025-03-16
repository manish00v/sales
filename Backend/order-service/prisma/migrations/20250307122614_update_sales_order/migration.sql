/*
  Warnings:

  - The primary key for the `SalesOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_block` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `order_date` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `order_status` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `required_date` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SalesOrder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SalesOrder_order_id_key";

-- AlterTable
ALTER TABLE "SalesOrder" DROP CONSTRAINT "SalesOrder_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "customer_id",
DROP COLUMN "delivery_block",
DROP COLUMN "id",
DROP COLUMN "order_date",
DROP COLUMN "order_id",
DROP COLUMN "order_status",
DROP COLUMN "payment_status",
DROP COLUMN "product_id",
DROP COLUMN "required_date",
DROP COLUMN "total_amount",
DROP COLUMN "updatedAt",
ADD COLUMN     "customerId" SERIAL NOT NULL,
ADD COLUMN     "deliveryBlock" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orderId" SERIAL NOT NULL,
ADD COLUMN     "orderStatus" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'Unpaid',
ADD COLUMN     "productId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "requiredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD CONSTRAINT "SalesOrder_pkey" PRIMARY KEY ("orderId");

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "shoppingAddress" TEXT NOT NULL,
    "customerGroup" TEXT NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "LineItems" (
    "orderLineItemId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "totalLinePrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LineItems_pkey" PRIMARY KEY ("orderLineItemId")
);

-- CreateTable
CREATE TABLE "SalesPerson" (
    "salesPersonId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "salesPersonName" TEXT NOT NULL,
    "EmailId" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "region" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "creditLimt" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SalesPerson_pkey" PRIMARY KEY ("salesPersonId")
);

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
