import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "DELETE") {
    return Response.json("Method not allowed", { status: 405 });
  }

  const id = await req.json();

  if (!id) {
    return Response.json("Missing id", { status: 400 });
  }

  try {
    await prisma.analytics.deleteMany({
      where: {
        urlId: id.id,
      },
    });

    await prisma.uRL.delete({
      where: {
        id: id.id,
      },
    });

    return Response.json("Link deleted", { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json("Error deleting link", { status: 500 });
  }
};

export { handler as GET, handler as POST, handler as DELETE };
