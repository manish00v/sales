-- CreateTable
CREATE TABLE "Discount" (
    "Discount_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "discount_criteria" TEXT,
    "product_discount" DOUBLE PRECISION,
    "customer_discount" DOUBLE PRECISION,
    "discount_eligibility_condition" TEXT,
    "discount_value" DOUBLE PRECISION,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("Discount_id")
);

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
