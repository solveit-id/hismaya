/*
  Warnings:

  - Added the required column `sector` to the `certifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certifications" ADD COLUMN     "img" TEXT,
ADD COLUMN     "sector" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "abouts" (
    "id" TEXT NOT NULL,
    "part" JSONB NOT NULL,
    "desc" JSONB NOT NULL,
    "img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "part" JSONB NOT NULL,
    "desc" JSONB NOT NULL,
    "img" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "subtitle" JSONB NOT NULL,
    "short_desc" JSONB NOT NULL,
    "long_desc" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);
