import { getAll } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const config = await getAll();
  const response = NextResponse.next();
  response.cookies.set("feature-flags", `${JSON.stringify(config)}`);
  return response;
}
