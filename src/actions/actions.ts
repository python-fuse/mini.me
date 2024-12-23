'use server';
import QRCode from 'qrcode';

export const generateLiveQR = async (url: string) => {
  const qr = await QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
  });

  return qr;
};
