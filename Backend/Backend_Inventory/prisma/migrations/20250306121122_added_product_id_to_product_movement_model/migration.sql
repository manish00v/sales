/*
  Warnings:

  - Added the required column `productId` to the `ProductMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductMovement" ADD COLUMN     "productId" TEXT NOT NULL;
