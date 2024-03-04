/*
  Warnings:

  - Made the column `anime_image` on table `Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `anime_title` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "anime_image" SET NOT NULL,
ALTER COLUMN "anime_title" SET NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "anime_mal_id" TEXT NOT NULL,
    "anime_title" TEXT,
    "user_email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
