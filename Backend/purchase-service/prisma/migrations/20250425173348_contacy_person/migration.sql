-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" TEXT NOT NULL,
    "CustomerId" VARCHAR(20) NOT NULL,
    "ContactPersonId" VARCHAR(20) NOT NULL,
    "FirstName" VARCHAR(35) NOT NULL,
    "MiddleName" VARCHAR(35),
    "LastName" VARCHAR(35) NOT NULL,
    "Department" VARCHAR(20) NOT NULL,
    "Function" VARCHAR(30) NOT NULL,
    "Gender" VARCHAR(10) NOT NULL,
    "Street1" VARCHAR(50) NOT NULL,
    "Street2" VARCHAR(50),
    "City" VARCHAR(30) NOT NULL,
    "State" VARCHAR(30) NOT NULL,
    "Region" VARCHAR(50) NOT NULL,
    "Country" VARCHAR(30) NOT NULL,
    "PinCode" VARCHAR(6) NOT NULL,
    "BusinessUnitCode" VARCHAR(4) NOT NULL,
    "SalesChannelId" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactPerson_CustomerId_key" ON "ContactPerson"("CustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactPerson_ContactPersonId_key" ON "ContactPerson"("ContactPersonId");
