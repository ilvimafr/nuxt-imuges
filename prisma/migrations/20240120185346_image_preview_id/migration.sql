/*
  Warnings:

  - A unique constraint covering the columns `[previewID]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - The required column `previewID` was added to the `Image` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "previewID" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_previewID_key" ON "Image"("previewID");
