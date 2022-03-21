import { isBrowser, userion, UserionDetections } from "@theme-studio/core";
import type { NextFetchEvent, NextRequest } from "next/server";

function Test() {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
}

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const agent = req.headers.get("user-agent") || "";
  const device = userion.parse(agent);
  // console.log(device);
  // console.log(isBrowser());

  // ReferenceError: window is not defined
  // const browser = isBrowser();
  const browser = Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );

  return new Response(JSON.stringify(req.ua) || "Unknown");
}
