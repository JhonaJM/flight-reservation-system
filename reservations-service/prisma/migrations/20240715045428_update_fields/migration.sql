/*
  Warnings:

  - Added the required column `currency` to the `Segments` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Segments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Segments" ADD COLUMN     "currency" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
