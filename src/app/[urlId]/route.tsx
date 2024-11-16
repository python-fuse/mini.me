import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { urlId: string } }
) {
  const { urlId } = params;

  try {
    const urlData = await prisma.uRL.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!urlData) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    await prisma.uRL.update({
      where: { id: urlId },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.redirect(urlData.original_url);
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}
