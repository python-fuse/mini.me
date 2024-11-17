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
