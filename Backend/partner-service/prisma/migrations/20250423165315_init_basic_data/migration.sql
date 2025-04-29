-- CreateEnum
CREATE TYPE "Title" AS ENUM ('MR', 'MS', 'MRS', 'DR');

-- CreateEnum
CREATE TYPE "PartnerClassification" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "LifeCycleStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DUPLICATE', 'OBSOLETE');

-- CreateTable
CREATE TABLE "basic_data" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(10),
    "firstName" VARCHAR(35),
    "middleName" VARCHAR(35),
    "lastName" VARCHAR(35),
    "businessName" VARCHAR(60),
    "tradeName" VARCHAR(35),
    "phone" VARCHAR(20),
    "email" VARCHAR(35),
    "website" VARCHAR(35),
    "partnerClassification" VARCHAR(2),
    "lifeCycleStatus" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basic_data_pkey" PRIMARY KEY ("id")
);
