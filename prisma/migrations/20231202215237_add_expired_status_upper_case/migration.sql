/*
  Warnings:

  - The values [Created,Complete,Expired] on the enum `StatusBooking` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusBooking_new" AS ENUM ('CREATED', 'COMPLETE', 'EXPIRED');
ALTER TABLE "booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "booking" ALTER COLUMN "status" TYPE "StatusBooking_new" USING ("status"::text::"StatusBooking_new");
ALTER TYPE "StatusBooking" RENAME TO "StatusBooking_old";
ALTER TYPE "StatusBooking_new" RENAME TO "StatusBooking";
DROP TYPE "StatusBooking_old";
ALTER TABLE "booking" ALTER COLUMN "status" SET DEFAULT 'CREATED';
COMMIT;

-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "status" SET DEFAULT 'CREATED';
