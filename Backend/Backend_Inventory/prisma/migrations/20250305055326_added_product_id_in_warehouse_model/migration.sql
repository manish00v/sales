/*
  Warnings:

  - Added the required column `productId` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "productId" TEXT NOT NULL;
