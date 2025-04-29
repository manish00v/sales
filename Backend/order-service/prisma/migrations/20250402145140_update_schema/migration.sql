/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `SalesOrder` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `SalesPerson` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SalesPerson` table. All the data in the column will be lost.
  - You are about to drop the `LineItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_customerId_fkey";

-- DropForeignKey
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "SalesPerson" DROP CONSTRAINT "SalesPerson_customerId_fkey";

-- AlterTable
ALTER TABLE "SalesOrder" DROP COLUMN "orderStatus";

-- AlterTable
ALTER TABLE "SalesPerson" DROP COLUMN "customerId",
DROP COLUMN "productId";

-- DropTable
DROP TABLE "LineItems";
