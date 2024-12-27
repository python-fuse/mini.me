import { FiSettings } from 'react-icons/fi';
import { Pathname } from './definitions';
import { BiHome, BiLink } from 'react-icons/bi';
import { BarChart3, QrCode, Tag, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

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
  {
    icon: Tag,
    title: 'Custom Alias',
    description:
      'Create custom aliases for your URLs. Make them memorable and easy to share.',
  },
];

interface Contact {
  name: string;
  href: string;
  icon: any;
}

export const contacts: Contact[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/python-fuse',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/umar-muktar-552a06268',
    icon: FaLinkedin,
  },

  {
    name: 'Twitter',
    href: 'https://twitter.com/mini_me',
    icon: FaTwitter,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/mini_me',
    icon: FaYoutube,
  },
];
