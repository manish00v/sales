/*
  Warnings:

  - The primary key for the `sales_persons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `sales_persons` table. All the data in the column will be lost.
  - The `id` column on the `sales_persons` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[SalesPersonId]` on the table `sales_persons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `SalesPersonId` to the `sales_persons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SalesPersonName` to the `sales_persons` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sales_persons_id_key";

-- AlterTable
ALTER TABLE "sales_persons" DROP CONSTRAINT "sales_persons_pkey",
DROP COLUMN "name",
ADD COLUMN     "SalesPersonId" VARCHAR(4) NOT NULL,
ADD COLUMN     "SalesPersonName" VARCHAR(30) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sales_persons_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_persons_SalesPersonId_key" ON "sales_persons"("SalesPersonId");
