/*
  Warnings:

  - You are about to drop the column `imgHrefs` on the `equipments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "equipments" DROP COLUMN "imgHrefs",
ADD COLUMN     "img_hrefs" TEXT[];
