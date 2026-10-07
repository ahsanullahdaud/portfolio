"use client";

import { useEffect, useRef, useState } from "react";
import { ui } from "@/content/ui";

/** Copies `text` to the clipboard and reads "copied" for 1.5s; the change is announced politely. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context or denied): the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="normal-case tracking-normal text-accent-text hover:underline"
    >
      {copied ? ui.buttons.copied : ui.buttons.copy}
    </button>
  );
}
