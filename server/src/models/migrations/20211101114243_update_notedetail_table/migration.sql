-- DropForeignKey
ALTER TABLE "DetailNote" DROP CONSTRAINT "DetailNote_detailNoteId_fkey";

-- AddForeignKey
ALTER TABLE "DetailNote" ADD CONSTRAINT "DetailNote_detailNoteId_fkey" FOREIGN KEY ("detailNoteId") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
