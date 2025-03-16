/*
  Warnings:

  - You are about to drop the column `customerId` on the `SalesOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SalesOrder" DROP CONSTRAINT "SalesOrder_customerId_fkey";

-- AlterTable
ALTER TABLE "SalesOrder" DROP COLUMN "customerId";
