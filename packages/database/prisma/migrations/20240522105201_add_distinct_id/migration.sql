/*
  Warnings:

  - Added the required column `distinctId` to the `Value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Value" ADD COLUMN     "distinctId" TEXT NOT NULL;
