-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Shipment" (
    "shipmentId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "trackingNumber" INTEGER NOT NULL,
    "shipmentStatus" "ShipmentStatus" NOT NULL,
    "dispatchDate" TIMESTAMP(3) NOT NULL,
    "estimatedDeliveryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("shipmentId")
);

-- CreateTable
CREATE TABLE "Carrier" (
    "carrierId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "contactDetails" INTEGER NOT NULL,
    "costStructure" INTEGER NOT NULL,
    "shipmentId" TEXT NOT NULL,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("carrierId")
);

-- CreateTable
CREATE TABLE "DeliveryRoute" (
    "routeId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sourceLocation" TEXT NOT NULL,
    "destinationLocation" TEXT NOT NULL,
    "routeTime" TIMESTAMP(3) NOT NULL,
    "distance" INTEGER NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,

    CONSTRAINT "DeliveryRoute_pkey" PRIMARY KEY ("routeId")
);

-- CreateTable
CREATE TABLE "DeliveryVehicle" (
    "vehicleId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "vehicleCapacity" TEXT NOT NULL,
    "assignedDriver" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,

    CONSTRAINT "DeliveryVehicle_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_shipmentId_key" ON "Shipment"("shipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_trackingNumber_key" ON "Shipment"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_carrierId_key" ON "Carrier"("carrierId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryRoute_routeId_key" ON "DeliveryRoute"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryVehicle_vehicleId_key" ON "DeliveryVehicle"("vehicleId");

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("shipmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryRoute" ADD CONSTRAINT "DeliveryRoute_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("shipmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryRoute" ADD CONSTRAINT "DeliveryRoute_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("carrierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryVehicle" ADD CONSTRAINT "DeliveryVehicle_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("shipmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryVehicle" ADD CONSTRAINT "DeliveryVehicle_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("carrierId") ON DELETE RESTRICT ON UPDATE CASCADE;
