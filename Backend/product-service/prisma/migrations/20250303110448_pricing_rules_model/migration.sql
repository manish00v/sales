-- DropForeignKey
ALTER TABLE "PricingRules" DROP CONSTRAINT "PricingRules_Discount_id_fkey";

-- AlterTable
ALTER TABLE "PricingRules" ALTER COLUMN "Discount_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PricingRules" ADD CONSTRAINT "PricingRules_Discount_id_fkey" FOREIGN KEY ("Discount_id") REFERENCES "Discount"("Discount_id") ON DELETE SET NULL ON UPDATE CASCADE;
