import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const urlId = searchParams.get("urlId");

  try {
    if (urlId) {
      const link = await prisma.uRL.findFirst({
        where: {
          id: urlId,
        },
        include: {
          analytics: true,
        },
      });

      return Response.json(link, { status: 200 });
    }
    const links = await prisma.uRL.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return Response.json(links, { status: 200 });
  } catch (e) {
    console.error("Error fetching user links:", e);
    return Response.json(
      { error: `Error fetching user links:: ${e}` },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };
