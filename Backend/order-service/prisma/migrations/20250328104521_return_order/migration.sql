-- CreateTable
CREATE TABLE "ReturnOrder" (
    "returnOrderId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reasonOfReturn" TEXT NOT NULL,
    "approvalStatus" TEXT NOT NULL,
    "returnStatus" TEXT NOT NULL,
    "totalRefundAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReturnOrder_pkey" PRIMARY KEY ("returnOrderId")
);

-- AddForeignKey
ALTER TABLE "ReturnOrder" ADD CONSTRAINT "ReturnOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnOrder" ADD CONSTRAINT "ReturnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SalesOrder"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
