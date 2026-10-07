import { cn } from "@/lib/cn";

/** Solid block cursor after a screen's lead line. Decorative; blinks unless motion is reduced. */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "ml-[0.15em] inline-block h-[0.8em] w-[0.3em] translate-y-[0.06em] bg-accent-line motion-safe:animate-[blink_1s_step-end_infinite]",
        className,
      )}
    />
  );
}
