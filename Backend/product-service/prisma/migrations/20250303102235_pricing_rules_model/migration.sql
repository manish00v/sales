-- CreateTable
CREATE TABLE "PricingRules" (
    "rule_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "Discount_id" INTEGER NOT NULL,
    "customer_group" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "base_price" DOUBLE PRECISION NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingRules_pkey" PRIMARY KEY ("rule_id")
);

-- AddForeignKey
ALTER TABLE "PricingRules" ADD CONSTRAINT "PricingRules_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingRules" ADD CONSTRAINT "PricingRules_Discount_id_fkey" FOREIGN KEY ("Discount_id") REFERENCES "Discount"("Discount_id") ON DELETE RESTRICT ON UPDATE CASCADE;
