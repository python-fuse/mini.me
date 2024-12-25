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

export async function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || 'Direct';

  console.log('IP:', ip);
  console.log('UserAgent:', userAgent);

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || 'Unknown';
  const os = parser.getOS().name || 'Unknown';
  const device = parser.getDevice().type || 'desktop';

  const geoData = await getGeoData(ip);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-browser', browser);
  requestHeaders.set('x-os', os);
  requestHeaders.set('x-device', device);
  requestHeaders.set('x-country', geoData.country);
  requestHeaders.set('x-city', geoData.city);
  requestHeaders.set('x-referrer', referrer);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/api/links/redirect/:path*'],
};
