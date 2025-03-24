/*
  Warnings:

  - You are about to drop the column `orderId` on the `Customer` table. All the data in the column will be lost.
  - Made the column `productId` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "orderId",
ALTER COLUMN "productId" SET NOT NULL;
