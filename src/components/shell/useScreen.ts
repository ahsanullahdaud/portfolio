"use client";

import { usePathname } from "next/navigation";
import { screenForPath } from "@/content/screens";

/** The screen matching the current URL, or undefined on unknown routes. */
export function useScreen() {
  return screenForPath(usePathname());
}
