/*
  Warnings:

  - You are about to drop the column `uuid` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Image` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_authorID_fkey";

-- DropIndex
DROP INDEX "Image_uuid_key";

-- DropIndex
DROP INDEX "User_uuid_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "uuid",
ADD COLUMN     "id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
ADD COLUMN     "id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
