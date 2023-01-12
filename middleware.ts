import { next } from "@vercel/edge";
import { get } from "@vercel/edge-config";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const featureFlags = await get("feature-flags");
  console.log(`feature-flags=${featureFlags}`);
  req.cookies.set("feature-flags", `${JSON.stringify(featureFlags)}`);
  return next();
}
