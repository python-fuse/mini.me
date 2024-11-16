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
  try {
    const res = await fetch(`/api/links?userId=${userId}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching links:", error);
    return error;
  }
};

export const fetchLink = async (urlId: string) => {
  try {
    const res = await fetch(`/api/links?urlId=${urlId}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching link:", error);
    return error;
  }
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
  try {
    const res = await fetch(`/api/links/deleteLink`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    console.error("Error deleting link:", error);
    return error;
  }
};
