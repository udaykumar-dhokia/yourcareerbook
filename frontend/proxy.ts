import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";

  const sub = host.split(".")[0];

  if (sub === "localhost:5173") return NextResponse.next();

  return NextResponse.rewrite(new URL(`/u/${sub}`, req.url));
}
