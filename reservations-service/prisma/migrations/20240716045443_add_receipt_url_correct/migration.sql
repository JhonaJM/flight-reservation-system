/*
  Warnings:

  - You are about to drop the column `receiptUrl` on the `Segments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "receiptUrl" TEXT,
ADD COLUMN     "stripeChargeId" TEXT;

-- AlterTable
ALTER TABLE "Segments" DROP COLUMN "receiptUrl";
