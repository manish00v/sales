/*
  Warnings:

  - The primary key for the `RelatedParty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ContactPersonId` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `GroupOrganisation` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `InvoicingParty` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `OrderingParty` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `PayingParty` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `ReceivingParty` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `SalesPersonId` on the `RelatedParty` table. All the data in the column will be lost.
  - You are about to drop the column `SourcingTeamId` on the `RelatedParty` table. All the data in the column will be lost.
  - The `id` column on the `RelatedParty` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "RelatedParty_ContactPersonId_key";

-- DropIndex
DROP INDEX "RelatedParty_SalesPersonId_key";

-- DropIndex
DROP INDEX "RelatedParty_SourcingTeamId_key";

-- AlterTable
ALTER TABLE "RelatedParty" DROP CONSTRAINT "RelatedParty_pkey",
DROP COLUMN "ContactPersonId",
DROP COLUMN "GroupOrganisation",
DROP COLUMN "InvoicingParty",
DROP COLUMN "OrderingParty",
DROP COLUMN "PayingParty",
DROP COLUMN "ReceivingParty",
DROP COLUMN "SalesPersonId",
DROP COLUMN "SourcingTeamId",
ADD COLUMN     "contactPersonId" VARCHAR(4),
ADD COLUMN     "groupOrganisation" VARCHAR(20),
ADD COLUMN     "invoicingParty" VARCHAR(20),
ADD COLUMN     "orderingParty" VARCHAR(20),
ADD COLUMN     "payingParty" VARCHAR(20),
ADD COLUMN     "receivingParty" VARCHAR(20),
ADD COLUMN     "salesPersonCode" VARCHAR(4),
ADD COLUMN     "sourcingTeamId" VARCHAR(4),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RelatedParty_pkey" PRIMARY KEY ("id");
