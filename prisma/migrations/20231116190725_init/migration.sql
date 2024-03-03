/*
  Warnings:

  - You are about to drop the column `role_name` on the `roles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "role_name",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "RoleNames";
