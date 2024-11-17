"use server";

import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

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
export async function updateUrl(id: string, data: { title: string }) {
  const url = await prisma.uRL.update({
    where: { id },
    data,
  });

  revalidatePath(`/urls/${id}`);
  return url;
}
