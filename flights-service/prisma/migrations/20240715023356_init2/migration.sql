-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "airlineCode" TEXT NOT NULL,
    "departureCity" TEXT NOT NULL,
    "arrivalCity" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "departureHour" TEXT NOT NULL,
    "arrivalHour" TEXT NOT NULL,
    "dateFlight" TIMESTAMP(3) NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Flight_status_departureCity_arrivalCity_idx" ON "Flight"("status", "departureCity", "arrivalCity");
