/*
  Warnings:

  - Made the column `customerDiscount` on table `Discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountCriteria` on table `Discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountEligibilityCondition` on table `Discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountValue` on table `Discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productDiscount` on table `Discount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Discount" ALTER COLUMN "customerDiscount" SET NOT NULL,
ALTER COLUMN "discountCriteria" SET NOT NULL,
ALTER COLUMN "discountEligibilityCondition" SET NOT NULL,
ALTER COLUMN "discountValue" SET NOT NULL,
ALTER COLUMN "productDiscount" SET NOT NULL;
