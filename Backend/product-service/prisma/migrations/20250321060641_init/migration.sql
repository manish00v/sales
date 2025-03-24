-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "unitOfMeasurement" TEXT,
    "stockStatus" TEXT NOT NULL,
    "weightVolume" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Discount" (
    "discountId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "discountCriteria" TEXT NOT NULL,
    "productDiscount" DOUBLE PRECISION NOT NULL,
    "customerDiscount" DOUBLE PRECISION NOT NULL,
    "discountEligibilityCondition" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("discountId")
);

-- CreateTable
CREATE TABLE "DiscountRules" (
    "discountId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "applicableTo" TEXT NOT NULL,
    "criteria" TEXT,
    "discountType" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscountRules_pkey" PRIMARY KEY ("discountId")
);

-- CreateTable
CREATE TABLE "PricingRules" (
    "ruleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "discountId" TEXT NOT NULL,
    "customerGroup" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingRules_pkey" PRIMARY KEY ("ruleId")
);

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
