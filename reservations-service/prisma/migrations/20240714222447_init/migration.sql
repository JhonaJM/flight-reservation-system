-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'ISSUED', 'VOIDED');

-- CreateEnum
CREATE TYPE "TypeIdentification" AS ENUM ('PASSAPORTE', 'CARNET_EXTRANJERIA', 'DNI');

-- CreateEnum
CREATE TYPE "TypePayment" AS ENUM ('CASH', 'TC');

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "pnrLocator" TEXT NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "currency" TEXT NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segments" (
    "id" TEXT NOT NULL,
    "flightId" INTEGER NOT NULL,
    "airlineCode" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "arrivalCity" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservationId" TEXT,

    CONSTRAINT "Segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passengers" (
    "id" TEXT NOT NULL,
    "giveName" TEXT NOT NULL,
    "surName" TEXT NOT NULL,
    "identification" "TypeIdentification" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "typeCode" TEXT NOT NULL,

    CONSTRAINT "Passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketInformation" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "ticketInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentInformation" (
    "id" TEXT NOT NULL,
    "type" "TypePayment" NOT NULL DEFAULT 'CASH',
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "paymentInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Segments" ADD CONSTRAINT "Segments_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
