'use server';
import { prisma } from '@/prisma/prisma';
import QRCode from 'qrcode';
import { ClickData } from '../utils/definitions';

export const generateLiveQR = async (url: string) => {
  const qr = await QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
  });

  return qr;
};

export const getUserTotalCLicks = async (userId: any) => {
  if (userId === undefined) {
    return 0;
  }
  const data = await prisma.uRL.aggregate({
    _sum: {
      clicks: true,
    },
    where: {
      userId,
    },
  });

  return data._sum.clicks;
};

export const getUserTotalLinks = async (userId: any) => {
  if (userId === undefined) {
    return 0;
  }
  const data = await prisma.uRL.count({
    where: {
      userId,
    },
  });

  return data;
};

export const recordClick = async (clickData: ClickData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const res = await prisma.$transaction(async (tx) => {
    // create raw analytics entry
    await tx.analytics.create({
      data: {
        urlId: clickData.urlId,
        browser: clickData.browser,
        os: clickData.os,
        device: clickData.device,
        country: clickData.country,
        city: clickData.city,
        referrer: clickData.referrer,
      },
    });

    // increment click count on url
    await tx.uRL.update({
      where: {
        id: clickData.urlId,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    // update daily stats
    await tx.dailyStat.upsert({
      where: {
        urlId_date: {
          urlId: clickData.urlId,
          date: today,
        },
      },
      update: {
        clicks: { increment: 1 },
      },
      create: {
        urlId: clickData.urlId,
        date: today,
        clicks: 1,
      },
    });

    // update device stats
    await tx.deviceStat.upsert({
      where: {
        urlId_browser_os_device: {
          urlId: clickData.urlId,
          browser: clickData.browser,
          os: clickData.os,
          device: clickData.device,
        },
      },
      update: {
        clicks: { increment: 1 },
      },
      create: {
        urlId: clickData.urlId,
        browser: clickData.browser,
        os: clickData.os,
        device: clickData.device,
        clicks: 1,
      },
    });

    // update location stats
    await tx.locationStat.upsert({
      where: {
        urlId_country_city: {
          urlId: clickData.urlId,
          country: clickData.country,
          city: clickData.city,
        },
      },
      update: {
        clicks: { increment: 1 },
      },
      create: {
        urlId: clickData.urlId,
        country: clickData.country,
        city: clickData.city,
        clicks: 1,
      },
    });
  });
};
