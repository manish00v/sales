-- CreateTable
CREATE TABLE "LineItems" (
    "orderLineItemId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "totalLinePrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LineItems_pkey" PRIMARY KEY ("orderLineItemId")
);

-- AddForeignKey
ALTER TABLE "LineItems" ADD CONSTRAINT "LineItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItems" ADD CONSTRAINT "LineItems_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
