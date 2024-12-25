import { prisma } from '@/prisma/prisma';
import { ClickData } from '@/src/utils/definitions';
import { NextRequest, NextResponse } from 'next/server';

const recordClick = async (clickData: ClickData) => {
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

export async function handler(request: NextRequest) {
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const searchParams = request.nextUrl.searchParams;

  const urlId = searchParams.get('urlId');

  if (!urlId) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  const urlData = await prisma.uRL.findUnique({
    where: {
      id: urlId,
    },
  });

  if (!urlData) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  const browser = request.headers.get('x-browser') || 'Unknown';
  const os = request.headers.get('x-os') || 'Unknown';
  const device = request.headers.get('x-device') || 'Unknown';
  const country = request.headers.get('x-country') || 'Unknown';
  const city = request.headers.get('x-city') || 'Unknown';
  const referrer = request.headers.get('x-referrer') || 'Unknown';

  try {
    // redirect to not found
    if (!urlData) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    // Create analytics entry
    await recordClick({
      urlId,
      browser,
      os,
      device,
      country,
      city,
      referrer,
    });

    // redirect to the actual site
    return NextResponse.json({ url: urlData.original_url });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export { handler as GET };
