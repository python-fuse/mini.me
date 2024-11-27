import { IconType } from "react-icons";

export interface Pathname {
  title: string;
  href: string;
  icon: IconType;
}

export interface ClickData {
  urlId: string;
  browser: string;
  os: string;
  device: string;
  country: string;
  city: string;
  referrer: string;
}

export type SearchParams = {
  query: string;
  page?: number;
  limit?: number;
};
