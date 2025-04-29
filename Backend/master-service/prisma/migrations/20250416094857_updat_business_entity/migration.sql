-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI');

-- AlterTable
ALTER TABLE "business_entities" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN';
