/*
  Warnings:

  - You are about to drop the column `factoryUnitId` on the `sourcing_units` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[SourcingUnitId,factoryUnitCode]` on the table `sourcing_units` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `factoryUnitCode` to the `sourcing_units` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sourcing_units_SourcingUnitId_factoryUnitId_key";

-- AlterTable
ALTER TABLE "sourcing_units" DROP COLUMN "factoryUnitId",
ADD COLUMN     "factoryUnitCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sourcing_units_SourcingUnitId_factoryUnitCode_key" ON "sourcing_units"("SourcingUnitId", "factoryUnitCode");
