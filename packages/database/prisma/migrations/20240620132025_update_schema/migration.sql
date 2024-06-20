/*
  Warnings:

  - The primary key for the `Key` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `workspaceId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_keyId_fkey";

-- DropForeignKey
ALTER TABLE "Value" DROP CONSTRAINT "Value_keyId_fkey";

-- AlterTable
ALTER TABLE "Key" DROP CONSTRAINT "Key_pkey",
ADD CONSTRAINT "Key_pkey" PRIMARY KEY ("id", "workspaceId");

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_keyId_workspaceId_fkey" FOREIGN KEY ("keyId", "workspaceId") REFERENCES "Key"("id", "workspaceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_keyId_workspaceId_fkey" FOREIGN KEY ("keyId", "workspaceId") REFERENCES "Key"("id", "workspaceId") ON DELETE CASCADE ON UPDATE CASCADE;
