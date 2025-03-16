-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "unit_of_measurement" TEXT,
    "stock_status" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);
