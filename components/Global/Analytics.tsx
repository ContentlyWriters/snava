"use client";

import { useEffect } from "react";
import { captureUTMs, track } from "@/lib/analytics";

/**
 * Mounted once in app/layout.tsx. Captures UTM params from the landing URL
 * (so ad/influencer clicks get attributed) and fires a page_view event.
 * Renders nothing.
 */
export default function Analytics() {
  useEffect(() => {
    captureUTMs();
    track("page_view");
  }, []);

  return null;
}
