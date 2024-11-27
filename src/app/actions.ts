"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { SearchParams } from "../utils/definitions";

export async function getUrl(id: string) {
  return await prisma.uRL.findUnique({
    where: { id },
    include: {
      dailyStats: {
        orderBy: { date: "asc" },
      },
      locationStats: {
        orderBy: { clicks: "desc" },
      },
      deviceStats: {
        orderBy: { clicks: "desc" },
      },
    },
  });
}

export async function getUrlStats(id: string) {
  const [dailyStats, locationStats, deviceStats] = await prisma.$transaction([
    prisma.dailyStat.findMany({
      where: { urlId: id },
      orderBy: { date: "asc" },
    }),
    prisma.locationStat.findMany({
      where: { urlId: id },
      orderBy: { clicks: "desc" },
    }),
    prisma.deviceStat.findMany({
      where: { urlId: id },
      orderBy: { clicks: "desc" },
    }),
  ]);

  return {
    dailyStats,
    locationStats,
    deviceStats,
  };
}

// Dashboard stats
export async function getDashboardStats(userId: string) {
  const [totalUrls, totalClicks, recentUrls] = await prisma.$transaction([
    prisma.uRL.count({
      where: { userId },
    }),
    prisma.uRL.aggregate({
      where: { userId },
      _sum: { clicks: true },
    }),
    prisma.uRL.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        dailyStats: {
          orderBy: { date: "desc" },
          take: 7,
        },
      },
    }),
  ]);

  return {
    totalUrls,
    totalClicks: totalClicks._sum.clicks || 0,
    recentUrls,
  };
}

// UPDATE actions
export async function updateUrl(
  id: string,
  data: { title: string; short_url: string; original_url: string }
) {
  const url = await prisma.uRL.update({
    where: { id },
    data,
  });

  revalidatePath(`/urls/${id}`);
  return url;
}

// Search urls

export const searchUrl = async ({
  query,
  userId,
  page = 1,
  limit = 10,
}: SearchParams) => {
  const skip = (page - 1) * limit;

  try {
    const urls = await prisma.uRL.findMany({
      where: {
        userId: {
          equals: userId,
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            short_url: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            original_url: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: limit, // Use the limit parameter
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.uRL.count({
      where: {
        userId: {
          equals: userId,
        },
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            short_url: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            original_url: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return {
      urls,
      total,
      hasMore: skip + urls.length < total,
    };
  } catch (e) {
    throw new Error("Failed to fetch URLs");
  }
};
