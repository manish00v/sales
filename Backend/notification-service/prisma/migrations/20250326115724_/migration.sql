/*
  Warnings:

  - Made the column `orderId` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "orderId" SET DATA TYPE TEXT;
