-- CreateTable
CREATE TABLE "sales_persons" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "street1" VARCHAR(50) NOT NULL,
    "street2" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "region" VARCHAR(50) NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "phoneNumber" VARCHAR(10) NOT NULL,
    "mobileNumber" VARCHAR(10) NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "department" TEXT NOT NULL,
    "salesPersonRole" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_persons_id_key" ON "sales_persons"("id");
