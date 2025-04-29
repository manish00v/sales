/*
  Warnings:

  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `event` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "orderId",
ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "fullData" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "service" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notification_id_seq";
