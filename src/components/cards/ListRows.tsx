import { cn } from "@/lib/cn";

type Row = { name: string; note?: string };

type ListRowsProps = {
  rows: readonly Row[];
  className?: string;
};

/** Rows separated by line-soft dividers, with an optional muted note on the right. Tighter in a short card. */
export function ListRows({ rows, className }: ListRowsProps) {
  return (
    <ul className={cn("divide-y divide-line-soft font-mono text-sm short-list:text-[13px]", className)}>
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex items-baseline justify-between gap-3 py-1.5 text-fg short-list:py-0.5"
        >
          <span>{row.name}</span>
          {row.note && <span className="shrink-0 text-xs text-muted short-list:text-[11px]">{row.note}</span>}
        </li>
      ))}
    </ul>
  );
}
