import { next } from "@vercel/edge";
import { get } from "@vercel/edge-config";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const featureFlags = await get("feature-flags");
  console.log(`feature-flags=${featureFlags}`);

  return next({
    headers: { "x-feature-flags": featureFlags },
  });
}
