import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url || typeof url !== "string") {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url, { cache: "no-store" });
    const text = await response.text();

    const title = text.match(/<title>(.*?)<\/title>/i)?.[1];
    const favicon = text.match(/<link rel="icon" href="(.*?)"\/>/i)?.[1];

    return Response.json({ title, favicon });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export { handler as GET, handler as POST };
