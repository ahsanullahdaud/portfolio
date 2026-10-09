import type { ReactNode } from "react";

// A word with a hyphen between non-space characters: "4-hour", "out-of-hours", "AI-first",
// "e-commerce", "T-SQL", "Stoke-on-Trent,". Trailing punctuation stays inside the span.
const HYPHENATED = /\S+-\S+/g;

/**
 * Renders a content string with every hyphenated word wrapped in a `whitespace-nowrap`
 * span, so the word can move to the next line as a whole but never breaks at the hyphen.
 * The string itself is unchanged (CONTENT.md stays verbatim, copy and paste too).
 */
export function NoBreak({ children }: { children: string }): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of children.matchAll(HYPHENATED)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(children.slice(last, start));
    parts.push(
      <span key={start} className="whitespace-nowrap">
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}
