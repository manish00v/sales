/*
  Warnings:

  - You are about to drop the column `EmailId` on the `SalesPerson` table. All the data in the column will be lost.
  - You are about to drop the column `creditLimit` on the `SalesPerson` table. All the data in the column will be lost.
  - Added the required column `emailId` to the `SalesPerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesPerson" DROP COLUMN "EmailId",
DROP COLUMN "creditLimit",
ADD COLUMN     "emailId" TEXT NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT,
ALTER COLUMN "region" SET DATA TYPE TEXT;
