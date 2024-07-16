/*
  Warnings:

  - You are about to drop the `paymentInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticketInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Passengers" ADD COLUMN     "reservationId" TEXT;

-- DropTable
DROP TABLE "paymentInformation";

-- DropTable
DROP TABLE "ticketInformation";

-- DropEnum
DROP TYPE "TypePayment";

-- CreateTable
CREATE TABLE "TicketInformation" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "reservationId" TEXT,

    CONSTRAINT "TicketInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Passengers" ADD CONSTRAINT "Passengers_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketInformation" ADD CONSTRAINT "TicketInformation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
