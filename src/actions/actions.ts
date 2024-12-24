'use server';
import { prisma } from '@/prisma/prisma';
import QRCode from 'qrcode';

export const generateLiveQR = async (url: string) => {
  const qr = await QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
  });

  return qr;
};

export const getUserTotalCLicks = async (userId: any) => {
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
  const data = await prisma.uRL.count({
    where: {
      userId,
    },
  });

  return data;
};
