import { FiSettings } from "react-icons/fi";
import { Pathname } from "./definitions";
import { BiHome, BiLink, BiQr } from "react-icons/bi";
import { URL } from "@prisma/client";

export const PATHNAMES: Pathname[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: BiHome,
  },
  {
    title: "Links",
    href: "/dashboard/links",
    icon: BiLink,
  },
  {
    title: "QR Codes",
    href: "/dashboard/qr_codes",
    icon: BiQr,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: FiSettings,
  },
];

export const FakeLinks: URL[] = [
  {
    id: "1",
    original_url: "https://www.google.com",
    title:
      "GoogledmbfuhydfdfkdjnjdnjdnfGoogledmbfuhydfdfkdjnjdnjdnfGoogledmbfuhydfdfkdjnjdnjdnfGoogledmbfuhydfdfkdjnjdnjdnf",
    short_url: "https://mini.me/google",
    clicks: 30,
    qrCode: "https://mini.me/google/",
    userId: "1",
    urlIcon: "https://www.google.com/favicon.ico",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    original_url: "https://www.facebook.com",
    title: "Facebook",
    short_url: "https://mini.me/facebook",
    clicks: 20,
    qrCode: "https://mini.me/facebook/",
    userId: "1",
    urlIcon: "https://www.facebook.com/favicon.ico",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Twitter",
    original_url: "https://www.twitter.com",
    short_url: "https://mini.me/twitter",
    clicks: 10,
    urlIcon: "https://www.twitter.com/favicon.ico",
    qrCode: "https://mini.me/twitter/",
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
