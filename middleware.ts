import { next } from "@vercel/edge";
import { get } from "@vercel/edge-config";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const greeting = await get("greeting");
  console.log(`url=${req.url}, nextUrl=${req.nextUrl}, greeting=${greeting}`);

  return next({
    headers: { "x-from-middleware": "kschoi - test" },
  });
}
