/*
  Warnings:

  - Added the required column `businessEntityId` to the `business_units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_units" ADD COLUMN     "businessEntityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_businessEntityId_fkey" FOREIGN KEY ("businessEntityId") REFERENCES "business_entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
