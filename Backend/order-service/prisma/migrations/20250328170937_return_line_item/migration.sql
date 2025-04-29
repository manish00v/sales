-- CreateTable
CREATE TABLE "ReturnLineItem" (
    "lineItemId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantityReturned" INTEGER NOT NULL,
    "conditionOfProduct" TEXT NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "refundAmount" DOUBLE PRECISION NOT NULL,
    "replacementStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReturnLineItem_pkey" PRIMARY KEY ("lineItemId")
);
