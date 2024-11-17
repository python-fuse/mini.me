-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_urlId_fkey";

-- CreateTable
CREATE TABLE "DailyStat" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceStat" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DeviceStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationStat" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LocationStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyStat_urlId_date_key" ON "DailyStat"("urlId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceStat_urlId_browser_os_device_key" ON "DeviceStat"("urlId", "browser", "os", "device");

-- CreateIndex
CREATE UNIQUE INDEX "LocationStat_urlId_country_city_key" ON "LocationStat"("urlId", "country", "city");

-- AddForeignKey
ALTER TABLE "DailyStat" ADD CONSTRAINT "DailyStat_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "URL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceStat" ADD CONSTRAINT "DeviceStat_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "URL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStat" ADD CONSTRAINT "LocationStat_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "URL"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "URL"("id") ON DELETE CASCADE ON UPDATE CASCADE;
