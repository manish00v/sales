/*
  Warnings:

  - The primary key for the `Discount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Discount_id` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `Discount_id` on the `PricingRules` table. All the data in the column will be lost.
  - Added the required column `discount_id` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_id` to the `PricingRules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PricingRules" DROP CONSTRAINT "PricingRules_Discount_id_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_pkey",
DROP COLUMN "Discount_id",
ADD COLUMN     "discount_id" INTEGER NOT NULL,
ADD CONSTRAINT "Discount_pkey" PRIMARY KEY ("discount_id");

-- AlterTable
ALTER TABLE "PricingRules" DROP COLUMN "Discount_id",
ADD COLUMN     "discount_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "DiscountRules"("discount_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingRules" ADD CONSTRAINT "PricingRules_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "DiscountRules"("discount_id") ON DELETE RESTRICT ON UPDATE CASCADE;
