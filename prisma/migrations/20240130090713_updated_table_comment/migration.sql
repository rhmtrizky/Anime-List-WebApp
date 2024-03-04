/*
  Warnings:

  - Added the required column `user_image` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `anime_title` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "user_image" TEXT NOT NULL,
ALTER COLUMN "anime_title" SET NOT NULL;
