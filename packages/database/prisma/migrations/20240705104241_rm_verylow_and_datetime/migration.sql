/*
  Warnings:

  - The values [DATETIME] on the enum `KeyType` will be removed. If these variants are still used in the database, this will fail.
  - The values [VERY_LOW] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KeyType_new" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN');
ALTER TABLE "Key" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Key" ALTER COLUMN "type" TYPE "KeyType_new" USING ("type"::text::"KeyType_new");
ALTER TYPE "KeyType" RENAME TO "KeyType_old";
ALTER TYPE "KeyType_new" RENAME TO "KeyType";
DROP TYPE "KeyType_old";
ALTER TABLE "Key" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('REQUIRED', 'HIGH', 'MEDIUM', 'LOW');
ALTER TABLE "Key" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "Key" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
ALTER TABLE "Key" ALTER COLUMN "priority" SET DEFAULT 'LOW';
COMMIT;
