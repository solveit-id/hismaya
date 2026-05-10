/*
  Warnings:

  - You are about to drop the column `description` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `testimonials` table. All the data in the column will be lost.
  - Changed the type of `name` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `desc` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `certifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `testimonial` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CertificationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TestimonialStatus" AS ENUM ('VISIBLE', 'HIDDEN');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "desc" JSONB,
DROP COLUMN "name",
ADD COLUMN     "name" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "certifications" DROP COLUMN "description",
ADD COLUMN     "desc" JSONB NOT NULL,
ADD COLUMN     "duration" JSONB NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "CertificationStatus" NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "name",
ADD COLUMN     "name" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "testimonials" DROP COLUMN "content",
DROP COLUMN "rating",
ADD COLUMN     "status" "TestimonialStatus" NOT NULL DEFAULT 'VISIBLE',
ADD COLUMN     "testimonial" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" VARCHAR(20);
