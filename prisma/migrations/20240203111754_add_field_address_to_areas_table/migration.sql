/*
  Warnings:

  - Made the column `name` on table `areas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "areas" ADD COLUMN     "address" VARCHAR(255),
ALTER COLUMN "name" SET NOT NULL;
