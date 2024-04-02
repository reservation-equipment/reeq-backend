/*
  Warnings:

  - Added the required column `time_from` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_to` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "time_from" VARCHAR(5) NOT NULL,
ADD COLUMN     "time_to" VARCHAR(5) NOT NULL;
