import { prisma } from '@/prisma/prisma';
import { ClickData } from '@/src/utils/definitions';
import { NextRequest, NextResponse } from 'next/server';
import { recordClick } from '@/src/actions/actions';

async function handler(request: NextRequest) {
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
