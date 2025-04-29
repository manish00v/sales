/*
  Warnings:

  - You are about to drop the column `exchangeId` on the `CurrencyExchangeRate` table. All the data in the column will be lost.
  - Added the required column `exchangeRate` to the `CurrencyExchangeRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CurrencyExchangeRate_exchangeId_key";

-- AlterTable
ALTER TABLE "CurrencyExchangeRate" DROP COLUMN "exchangeId",
ADD COLUMN     "exchangeRate" INTEGER NOT NULL;
