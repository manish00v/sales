/*
  Warnings:

  - Changed the type of `taxType` on the `Tax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaxType" AS ENUM ('CGST', 'SGST', 'IGST');

-- AlterTable
ALTER TABLE "Tax" DROP COLUMN "taxType",
ADD COLUMN     "taxType" "TaxType" NOT NULL;
