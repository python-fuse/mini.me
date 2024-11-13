/*
  Warnings:

  - A unique constraint covering the columns `[short_url]` on the table `URL` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "URL_short_url_key" ON "URL"("short_url");
