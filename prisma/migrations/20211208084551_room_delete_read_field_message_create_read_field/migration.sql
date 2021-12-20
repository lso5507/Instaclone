/*
  Warnings:

  - You are about to drop the column `read` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "read" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "read";
