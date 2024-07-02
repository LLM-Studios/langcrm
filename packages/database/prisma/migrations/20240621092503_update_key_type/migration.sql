-- CreateEnum
CREATE TYPE "KeyType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'DATETIME');

-- AlterTable
ALTER TABLE "Key" ADD COLUMN     "type" "KeyType" NOT NULL DEFAULT 'TEXT';
