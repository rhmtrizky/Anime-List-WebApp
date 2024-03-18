/*
  Warnings:

  - You are about to drop the column `user_email` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_image` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Collection_user_email_anime_mal_id_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "user_email";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "user_email",
DROP COLUMN "user_image",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT;
