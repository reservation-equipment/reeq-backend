-- DropForeignKey
ALTER TABLE "areas" DROP CONSTRAINT "areas_institutes_id_fkey";

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_institutes_id_fkey" FOREIGN KEY ("institutes_id") REFERENCES "institutes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
