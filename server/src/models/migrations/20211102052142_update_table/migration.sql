/*
  Warnings:

  - The primary key for the `Rental` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "DetailNote" DROP CONSTRAINT "DetailNote_detailNoteId_fkey";

-- AlterTable
ALTER TABLE "DetailNote" ALTER COLUMN "detailNoteId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rental_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rental_id_seq";

-- AddForeignKey
ALTER TABLE "DetailNote" ADD CONSTRAINT "DetailNote_detailNoteId_fkey" FOREIGN KEY ("detailNoteId") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
