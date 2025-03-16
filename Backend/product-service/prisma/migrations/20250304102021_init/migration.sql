/*
  Warnings:

  - The primary key for the `Discount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customer_discount` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `discount_criteria` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `discount_eligibility_condition` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `discount_value` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `product_discount` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Discount` table. All the data in the column will be lost.
  - The primary key for the `DiscountRules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicable_to` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to drop the column `discount_type` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to drop the column `discount_value` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to drop the column `effective_date` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to drop the column `expiry_date` on the `DiscountRules` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `DiscountRules` table. All the data in the column will be lost.
  - The primary key for the `PricingRules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `base_price` on the `PricingRules` table. All the data in the column will be lost.
  - You are about to drop the column `customer_group` on the `PricingRules` table. All the data in the column will be lost.
  - You are about to drop the column `discount_id` on the `PricingRules` table. All the data in the column will be lost.
  - You are about to drop the column `effective_date` on the `PricingRules` table. All the data in the column will be lost.
  - You are about to drop the column `expire_date` on the `PricingRules` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `PricingRules` table. All the data in the column will be lost.
  - You are about to drop the column `rule_id` on the `PricingRules` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock_status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit_of_measurement` on the `Product` table. All the data in the column will be lost.
  - Added the required column `discountId` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicableTo` to the `DiscountRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountType` to the `DiscountRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `DiscountRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effectiveDate` to the `DiscountRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `DiscountRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `DiscountRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `PricingRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerGroup` to the `PricingRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountId` to the `PricingRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effectiveDate` to the `PricingRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expireDate` to the `PricingRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `PricingRules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockStatus` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_product_id_fkey";

-- DropForeignKey
ALTER TABLE "DiscountRules" DROP CONSTRAINT "DiscountRules_product_id_fkey";

-- DropForeignKey
ALTER TABLE "PricingRules" DROP CONSTRAINT "PricingRules_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "PricingRules" DROP CONSTRAINT "PricingRules_product_id_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_pkey",
DROP COLUMN "customer_discount",
DROP COLUMN "discount_criteria",
DROP COLUMN "discount_eligibility_condition",
DROP COLUMN "discount_id",
DROP COLUMN "discount_value",
DROP COLUMN "product_discount",
DROP COLUMN "product_id",
ADD COLUMN     "customerDiscount" DOUBLE PRECISION,
ADD COLUMN     "discountCriteria" TEXT,
ADD COLUMN     "discountEligibilityCondition" TEXT,
ADD COLUMN     "discountId" INTEGER NOT NULL,
ADD COLUMN     "discountValue" DOUBLE PRECISION,
ADD COLUMN     "productDiscount" DOUBLE PRECISION,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "Discount_pkey" PRIMARY KEY ("discountId");

-- AlterTable
ALTER TABLE "DiscountRules" DROP CONSTRAINT "DiscountRules_pkey",
DROP COLUMN "applicable_to",
DROP COLUMN "discount_id",
DROP COLUMN "discount_type",
DROP COLUMN "discount_value",
DROP COLUMN "effective_date",
DROP COLUMN "expiry_date",
DROP COLUMN "product_id",
ADD COLUMN     "applicableTo" TEXT NOT NULL,
ADD COLUMN     "discountId" SERIAL NOT NULL,
ADD COLUMN     "discountType" TEXT NOT NULL,
ADD COLUMN     "discountValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "effectiveDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "DiscountRules_pkey" PRIMARY KEY ("discountId");

-- AlterTable
ALTER TABLE "PricingRules" DROP CONSTRAINT "PricingRules_pkey",
DROP COLUMN "base_price",
DROP COLUMN "customer_group",
DROP COLUMN "discount_id",
DROP COLUMN "effective_date",
DROP COLUMN "expire_date",
DROP COLUMN "product_id",
DROP COLUMN "rule_id",
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "customerGroup" TEXT NOT NULL,
ADD COLUMN     "discountId" INTEGER NOT NULL,
ADD COLUMN     "effectiveDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "ruleId" SERIAL NOT NULL,
ADD CONSTRAINT "PricingRules_pkey" PRIMARY KEY ("ruleId");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "product_id",
DROP COLUMN "product_name",
DROP COLUMN "stock_status",
DROP COLUMN "unit_of_measurement",
ADD COLUMN     "productId" SERIAL NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "stockStatus" TEXT NOT NULL,
ADD COLUMN     "unitOfMeasurement" TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "DiscountRules"("discountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountRules" ADD CONSTRAINT "DiscountRules_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingRules" ADD CONSTRAINT "PricingRules_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingRules" ADD CONSTRAINT "PricingRules_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "DiscountRules"("discountId") ON DELETE RESTRICT ON UPDATE CASCADE;
