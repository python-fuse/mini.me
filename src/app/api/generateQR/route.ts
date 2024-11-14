import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

async function handler(req: NextRequest, res: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url || typeof url !== "string") {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const qrCode = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
    });
    return Response.json({ qrCode });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export { handler as GET, handler as POST };
