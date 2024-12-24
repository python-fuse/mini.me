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

export const getUserTotalCLicks = async (userId: string) => {};

export const getUserTotalLinks = async (userId: string) => {
  const data = await prisma.uRL.count({
    where: {
      userId,
    },
  });

  return data;
};
