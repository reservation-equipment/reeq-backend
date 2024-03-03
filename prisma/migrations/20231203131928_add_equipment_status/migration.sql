-- CreateEnum
CREATE TYPE "StatusEquipment" AS ENUM ('FREE', 'BOOKED');

-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "status" "StatusEquipment" NOT NULL DEFAULT 'FREE';
