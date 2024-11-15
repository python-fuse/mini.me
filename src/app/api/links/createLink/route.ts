import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URL as TURL } from "@prisma/client";

const handler = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const data = await req.json();

  try {
    const linkData: TURL = {
      id: data.id,
      userId: data.userId,
      original_url: data.original_url,
      title: data.title,
      short_url: data.short_url,
      qrCode: data.qrCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      clicks: 0,
    };

    console.log(linkData);

    const newLink = await prisma.uRL.create({
      data: linkData,
    });

    return Response.json(newLink, { status: 201 });
  } catch (e) {
    console.error("Error creating link:", e);
    return Response.json(
      { error: `Error creating link: ${e}` },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };
