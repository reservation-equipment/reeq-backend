-- CreateEnum
CREATE TYPE "StatusBooking" AS ENUM ('Created', 'Complete');

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "status" "StatusBooking" NOT NULL DEFAULT 'Created';
