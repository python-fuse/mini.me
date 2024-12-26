import { FiSettings } from 'react-icons/fi';
import { Pathname } from './definitions';
import { BiHome, BiLink, BiQr } from 'react-icons/bi';
import { URL } from '@prisma/client';
import { BarChart3, QrCode, Zap } from 'lucide-react';

export const PATHNAMES: Pathname[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: BiHome,
  },
  {
    title: 'Links',
    href: '/dashboard/links',
    icon: BiLink,
  },
  // {
  //   title: "QR Codes",
  //   href: "/dashboard/qr_codes",
  //   icon: BiQr,
  // },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: FiSettings,
  },
];

export const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Create short URLs in seconds. Our optimized infrastructure ensures quick redirects.',
  },
  {
    icon: QrCode,
    title: 'QR Code Generator',
    description:
      'Generate QR codes for your shortened URLs instantly. Perfect for print materials.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description:
      'Track clicks, geographic location, and devices. Make data-driven decisions.',
  },
];
