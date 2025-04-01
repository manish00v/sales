/*
  Warnings:

  - You are about to drop the column `fullData` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "fullData",
ADD COLUMN     "orderId" TEXT;

-- CreateIndex
CREATE INDEX "Notification_service_idx" ON "Notification"("service");

-- CreateIndex
CREATE INDEX "Notification_event_idx" ON "Notification"("event");

-- CreateIndex
CREATE INDEX "Notification_orderId_idx" ON "Notification"("orderId");
