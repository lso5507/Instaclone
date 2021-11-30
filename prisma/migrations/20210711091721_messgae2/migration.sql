/*
  Warnings:

  - You are about to drop the `_MessageToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_MessageToRoom" DROP CONSTRAINT "_MessageToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_MessageToRoom" DROP CONSTRAINT "_MessageToRoom_B_fkey";

-- DropTable
DROP TABLE "_MessageToRoom";

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
