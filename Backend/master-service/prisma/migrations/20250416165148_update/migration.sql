/*
  Warnings:

  - Added the required column `businessEntityCode` to the `factory_units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "factory_units" ADD COLUMN     "businessEntityCode" VARCHAR(4) NOT NULL,
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN';

-- AddForeignKey
ALTER TABLE "factory_units" ADD CONSTRAINT "factory_units_businessEntityCode_fkey" FOREIGN KEY ("businessEntityCode") REFERENCES "business_entities"("businessEntityCode") ON DELETE RESTRICT ON UPDATE CASCADE;
