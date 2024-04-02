/*
  Warnings:

  - You are about to drop the column `date_from` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `date_to` on the `booking` table. All the data in the column will be lost.
  - Added the required column `date` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "date_from",
DROP COLUMN "date_to",
ADD COLUMN     "date" TIMESTAMP(6) NOT NULL;
