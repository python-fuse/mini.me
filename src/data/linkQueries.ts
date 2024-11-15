import { prisma } from "@/prisma/prisma";
import { URL as TURL } from "@prisma/client";
import { redirect } from "next/navigation";
export const createLink = async (
  data: Omit<TURL, "createdAt" | "updatedAt" | "clicks">
) => {
  try {
    const res = await fetch("/api/links/createLink", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    console.error("Error creating link:", error);
    return error;
  }
};

export const fetchLinkData = async (link: string) => {
  await prisma.uRL.findFirst({
    where: {
      short_url: link,
    },
  });
};

export const fetchAllLinks = async (userId: string) => {
  await prisma.uRL.findMany({
    where: {
      userId,
    },
  });
};

export const updateURLTitle = async (id: string, title: string) => {
  await prisma.uRL.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
};

export const deleteURL = async (id: string) => {
  await prisma.uRL.delete({
    where: {
      id,
    },
  });
};
