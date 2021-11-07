-- CreateTable
CREATE TABLE "DetailNote" (
    "id" SERIAL NOT NULL,
    "property" TEXT NOT NULL,
    "bedroom" TEXT NOT NULL,
    "furniture" TEXT NOT NULL,
    "detailNoteId" INTEGER NOT NULL,

    CONSTRAINT "DetailNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailNote_detailNoteId_key" ON "DetailNote"("detailNoteId");

-- AddForeignKey
ALTER TABLE "DetailNote" ADD CONSTRAINT "DetailNote_detailNoteId_fkey" FOREIGN KEY ("detailNoteId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
