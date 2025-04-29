/*
  Warnings:

  - Changed the type of `serviceType` on the `Carrier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('Standard_Shipping', 'Express_Shipping', 'Same_Day_Delivery', 'Overnight_Shipping', 'Two_Day_Shipping', 'International_Shipping');

-- AlterTable
ALTER TABLE "Carrier" DROP COLUMN "serviceType",
ADD COLUMN     "serviceType" "ServiceType" NOT NULL;
