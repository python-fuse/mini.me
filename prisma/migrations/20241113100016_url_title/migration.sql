/*
  Warnings:

  - Added the required column `title` to the `URL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "URL" ADD COLUMN     "title" TEXT NOT NULL;
