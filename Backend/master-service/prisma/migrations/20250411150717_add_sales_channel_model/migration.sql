-- CreateTable
CREATE TABLE "sales_channels" (
    "id" SERIAL NOT NULL,
    "salesChannelId" VARCHAR(4) NOT NULL,
    "salesChannelName" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_channels_salesChannelId_key" ON "sales_channels"("salesChannelId");
