/*
  Warnings:

  - You are about to drop the column `authorId` on the `Image` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorID` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_authorId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "authorId",
ADD COLUMN     "authorID" UUID NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
