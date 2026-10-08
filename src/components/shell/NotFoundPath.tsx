"use client";

import { useSyncExternalStore } from "react";
import { ui } from "@/content/ui";
import { PromptLine } from "./PromptLine";

const noopSubscribe = () => () => {};

/**
 * The 404 heading: `~/ahsan $ cd <requested path>`. The path is read from the browser
 * after hydration (empty during prerender), so the static 404 page shows the real URL.
 */
export function NotFoundPath() {
  const pathname = useSyncExternalStore(
    noopSubscribe,
    () => window.location.pathname,
    () => "",
  );
  return <PromptLine as="h1" command={`${ui.notFound.command} ${pathname}`.trim()} cursor />;
}
