-- CreateTable
CREATE TABLE "DiscountRules" (
    "discount_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "applicable_to" TEXT NOT NULL,
    "criteria" TEXT,
    "discount_type" TEXT NOT NULL,
    "discount_value" DOUBLE PRECISION NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscountRules_pkey" PRIMARY KEY ("discount_id")
);

-- AddForeignKey
ALTER TABLE "DiscountRules" ADD CONSTRAINT "DiscountRules_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
