/*
  Warnings:

  - You are about to drop the column `read` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "read";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "read" INTEGER NOT NULL DEFAULT 0;
