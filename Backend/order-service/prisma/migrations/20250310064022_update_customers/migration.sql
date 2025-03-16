/*
  Warnings:

  - You are about to drop the column `creditLimt` on the `SalesPerson` table. All the data in the column will be lost.
  - Added the required column `creditLimit` to the `SalesPerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SalesPerson" DROP COLUMN "creditLimt",
ADD COLUMN     "creditLimit" DOUBLE PRECISION NOT NULL;
