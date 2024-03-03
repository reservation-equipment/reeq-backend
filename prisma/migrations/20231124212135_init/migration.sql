/*
  Warnings:

  - Added the required column `institutes_id` to the `areas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "areas" ADD COLUMN     "institutes_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_institutes_id_fkey" FOREIGN KEY ("institutes_id") REFERENCES "institutes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
