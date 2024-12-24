import { prisma } from '@/prisma/prisma';
import { ClickData } from '@/src/utils/definitions';
import { NextRequest, NextResponse } from 'next/server';
import UAParser from 'ua-parser-js';

function getClientIP(request: NextRequest): string {
  const ipp = process.env.NODE_ENV === 'development' && '8.8.8.8';

  if (ipp) {
    return ipp;
  }

  // Try x-forwarded-for header first
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Try Cloudflare-specific headers if using Cloudflare
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Try true-client-ip header
  const trueClientIP = request.headers.get('true-client-ip');
  if (trueClientIP) {
    return trueClientIP;
  }

  // Try getting IP from NextRequest
  const ip = request.ip;
  if (ip) {
    return ip;
  }

  // If all else fails
  return 'Unknown';
}
const getGeoData = async (ip: string) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      ip = '105.112.214.165';
    }

    const res = await fetch(`http://ip-api.com/json/${ip}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (data.status === 'fail') {
      throw new Error(data.message);
    }
    return { country: data.country, city: data.city };
  } catch (e) {
    console.error('Error fetching geo data:', e);
    return { country: 'Unknown', city: 'Unknown' };
  }
};

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

  console.log('Upsert result:', res);
};

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/l/')) {
    return NextResponse.next();
  }
  const urlId = request.nextUrl.pathname.split('/')[2];
  console.log(urlId);

  const urlData = await prisma.uRL.findUnique({
    where: {
      id: urlId,
    },
  });

  if (!urlData) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  try {
    // get Url data
    const urlData = await prisma.uRL.findUnique({
      where: {
        id: urlId,
      },
    });

    // redirect to not found
    if (!urlData) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }

    // Parse User Agent
    const userAgent = request.headers.get('user-agent') || '';
    const parser = new UAParser(userAgent);
    const browserData = parser.getBrowser();
    const osData = parser.getOS();
    const deviceData = parser.getDevice();
    const referrer = request.headers.get('referer') || 'Direct';

    // Get IP address
    const ip = getClientIP(request);

    if (ip !== 'Unknown') {
      const { country, city } = await getGeoData(ip);

      // Create analytics entry
      await recordClick({
        urlId,
        browser: browserData.name || 'Unknown',
        os: osData.name || 'Unknown',
        device: deviceData.type || 'Unknown',
        country,
        city,
        referrer,
      });
    }

    // redirect to the actual site
    return NextResponse.redirect(urlData.original_url);
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: '/l/:path*',
};
