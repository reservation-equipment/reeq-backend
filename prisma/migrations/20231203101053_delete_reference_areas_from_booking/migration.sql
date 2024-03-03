/*
  Warnings:

  - You are about to drop the column `area_id` on the `booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_area_id_fkey";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "area_id";
