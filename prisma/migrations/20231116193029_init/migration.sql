/*
  Warnings:

  - Made the column `user_id` on table `booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `equipment_id` on table `booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `area_id` on table `booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `area_id` on table `equipments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `equipments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `count` on table `equipments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "equipment_id" SET NOT NULL,
ALTER COLUMN "area_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "equipments" ALTER COLUMN "area_id" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "count" SET NOT NULL;
