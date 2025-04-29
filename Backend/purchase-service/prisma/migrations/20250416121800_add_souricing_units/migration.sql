-- CreateTable
CREATE TABLE "SourcingUnit" (
    "id" TEXT NOT NULL,
    "SourcingUnitId" VARCHAR(4) NOT NULL,
    "SourcingUnitDesc" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourcingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SourcingUnit_SourcingUnitId_key" ON "SourcingUnit"("SourcingUnitId");
