import type { ReactNode } from "react";

// Re-mounts on every navigation, so the screen enter animation (opacity and a 6px
// rise over --dur-2, PLAN.md §8.4) replays. motion-safe: nothing under reduced motion.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="lg:h-full motion-safe:animate-[screen-enter_var(--dur-2)_var(--ease)_both]">
      {children}
    </div>
  );
}
